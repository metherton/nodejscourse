"use strict";

var stream = require('stream');

var body = document.body;

var logger = new stream.Writable;

logger._write = function(data, enc, next) {
  body.innerHTML = body.innerHTML + data + '<br>';
  next();
};

setInterval(function () {
  logger.write(new Date().toISOString());
}, 1000);