'use strict';

var zlib = require('zlib');
var fs = require('fs');

var gzip = zlib.createGzip();

var inStream = fs.createReadStream('zip0.js');
var outStream = fs.createWriteStream('zip0.js.gz');

inStream
  .pipe(gzip)
  .pipe(outStream);
