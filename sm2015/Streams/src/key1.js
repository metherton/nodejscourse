'use strict';

var stream = require('stream');

// third party modules
var es = require('event-stream');
var keypress = require('keypress');

// use objectMode to send key descriptions
var keypresser = new stream.PassThrough({objectMode: true});

process.stdin.setRawMode(true);
process.stdin.resume();

keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
  keypresser.write({ch: ch, key: key});
});

keypresser
  .pipe(es.stringify())
  .pipe(process.stdout);
