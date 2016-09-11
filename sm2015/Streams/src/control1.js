'use strict';

// core modules
var stream = require('stream');
var util = require('util');


// third party modules
var es = require('event-stream');
var keypress = require('keypress');

//stream instances
var keypresser = new stream.PassThrough({objectMode: true});
var keyparser = new stream.Transform({objectMode: true});
var killer = es.through(function(cmd) {
  if ('die' === cmd.name) {
    process.exit();
    return;
  }
  this.queue(cmd);
});

var controller, randomlocator;

keyparser._transform = function(keypress, enc, done) {
  keypress = keypress || {};

  var ch = keypress.ch;
  var key = keypress.key;
  var cmd = {name: 'noop'};

  if (key) {
    if (key.ctrl && 'c' === key.name) {
      cmd.name = 'die';
      return done(null, cmd);
    }
    
    if ('c' === key.name) {
      cmd.name = 'reset';
      cmd.rgb = makecolor();
      cmd.loc = [0, 0];
    }

    if ('b' === key.name) { cmd.name = 'toggle-backled'; }
    if ('right' === key.name) { cmd.name = 'right'; }
    if ('left' === key.name) { cmd.name = 'left'; }
    if ('up' === key.name) { cmd.name = 'roll'; }
    if ('down' === key.name) { cmd.name = 'stop'; }
    if ('q' === key.name) { cmd.name = 'die'; }
  }

  if (!key && ch) {
    if (',' === ch) { cmd.name = 'slower'; }
    if ('.' === ch) { cmd.name = 'faster'; }  
  }
  
  done(null, cmd);
};

function makecolor() {
  var r = ~~(Math.random() * 255);
  var g = ~~(Math.random() * 255);
  var b = ~~(Math.random() * 255);
  return [r, g, b];
}

util.inherits(Controller, stream.Transform);

function Controller(opt) {
  var self = this;

  self._heading = 0;
  self._speed = 0.3;
  self._backled = true;

  opt = opt || {};
  opt.objectMode = true;
  stream.Transform.call(this, opt);
}

Controller.prototype._transform = function(cmd, enc, done) {
  var self = this;

  if ('toggle-backled' === cmd.name) {
    self._backled = !self._backled;
  }

  if ('right' === cmd.name) { self._heading = (self._heading + 15) % 360; }
  if ('left' === cmd.name) { self._heading = (360 + self._heading - 15) % 360; }

  var speed = self._speed;
  if ('slower' === cmd.name) { speed -= 0.1; speed = speed < 0.1 ? 0.1 : speed; }
  if ('faster' === cmd.name) { speed += 0.1; speed = speed > 1.0 ? 1.0 : speed; }
  self._speed = speed;

  cmd.state = {
    heading: self._heading,
    speed: self._speed,
    backled: self._backled
  };

  self.push(cmd);
  done();
};

util.inherits(RandomLocator, stream.Duplex);

function RandomLocator(opt) {
  var self = this;
  var x = 0;
  var y = 0;

  opt = opt || {};
  opt.objectMode = true;
  stream.Duplex.call(this, opt);

  setInterval(function() {
    self.push({
      name: 'loc',
      x: x += -50 + ~~(100 * Math.random()),
      y: y += -50 + ~~(100 * Math.random())
    });
  }, 1000);
}

RandomLocator.prototype._read = function() {};

RandomLocator.prototype._write = function(cmd, enc, done) {
  this.push(cmd);

  done();
};

controller = new Controller;
randomlocator = new RandomLocator;

process.stdin.setRawMode(true);
process.stdin.resume();
keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
  keypresser.write({ch: ch, key: key});
});

//outstream
keypresser
  .pipe(keyparser)
  .pipe(killer)
  .pipe(randomlocator)
  .pipe(controller)
  .pipe(es.stringify())
  .pipe(process.stdout);


process.on('uncaughtException', function () {
  console.log('oh oh')
})
