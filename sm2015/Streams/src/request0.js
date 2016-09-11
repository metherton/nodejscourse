'use strict';

var fs = require('fs');
var request = require('request');

function error(err) {
  console.error('Error: ' + err);
}

request('http://example.com/file.txt')
  .on('error', error)
  .pipe(fs.createWriteStream('./file.txt'))
  .on('finish', function() {
    console.log('Done!');
  })
  .on('error', error);
