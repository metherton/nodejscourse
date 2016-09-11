"use strict";

var net = require('net');

net.createServer(function(socket) {

  socket.pipe(socket);

}).listen(8124);

// telnet localhost 8124
// type stuff, hit return
