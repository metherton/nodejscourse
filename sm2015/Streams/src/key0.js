'use strict';

var stream = require('stream');
var keypresser = new stream.PassThrough();

process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', function(data) {
  keypresser.write(data);
});



keypresser.pipe(process.stdout);