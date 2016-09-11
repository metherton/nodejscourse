var net = require('net');
var ps = require('pubsub-js');
var JSONStream = require('JSONStream');
var es = require('event-stream');
function handle(socket) {
  return function (o) {
    console.log(o)
    if (o.pub) {
      ps.publish.apply(ps, o.pub)
    }
    if (o.sub) {
      ps.subscribe(o.sub, function (topic, data) {
        if (socket.destroyed) { return ps.unsubscribe(topic); }
        socket.write(JSON.stringify({topic: topic, data: data}));
      });
    }
    return socket;
  }
}
net.createServer(function (socket) {
  socket
    .pipe(JSONStream.parse())
    .pipe(es.through(handle(socket)))

}).listen(2015)