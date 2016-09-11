'use strict';

var fs = require('fs');
var stream = require('stream');

var inStream = fs.createReadStream('pipe1.js');

var upperStream = new stream.Transform();
upperStream._transform = function(data, enc, done) {
  this.push(data.toString().toUpperCase());
  done();
};


inStream
  .pipe(upperStream)
  .pipe(process.stdout);
