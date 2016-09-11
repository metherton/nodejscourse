"use strict";

var net = require('net');

var es = require('event-stream');

net.createServer(function(connection) {
  connection
    .pipe(
      es.through(function(data) {
        var str = data.toString();

        if ('quit\r\n' === str || 'quit' === str) { 
          connection.end();
          return;
        }

        this.queue(str.toUpperCase());
        
      }))
      .pipe(connection);

}).listen(8124);
