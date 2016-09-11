'use strict';

var fs = require('fs');
var es = require('event-stream');

var inStream = fs.createReadStream('pipe2.js');

inStream
  .pipe(es.through(function(data) {
    this.queue(data.toString().toUpperCase());
  }))
  .pipe(process.stdout);
