'use strict';

var stream = require('stream');

// third party modules
var es = require('event-stream');
var keypress = require('keypress');

//streams:
var keypresser = new stream.PassThrough({objectMode: true});
var keyparser = new stream.Transform({objectMode: true});
var killer = es.through(function(cmd) {
  if ('die' === cmd.name) {
    process.exit();
    return;
  }
  this.queue(cmd);
});

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


process.stdin.setRawMode(true);
process.stdin.resume();
keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
  keypresser.write({ch: ch, key: key});
});

keypresser
  .pipe(keyparser)
  .pipe(killer)
  .pipe(es.stringify())
  .pipe(process.stdout);
