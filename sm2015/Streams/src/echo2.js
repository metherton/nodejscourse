
var net = require('net');
var es = require('event-stream');

function strStream() {
  return es.map(function(data, cb) {
    cb(null, data.toString());
  });
}

function upperStream(){
   return es.map(function(str, cb) {
    cb(null, str.toUpperCase());
  }); 
}

function quitStream (connection) {
  return es.through(function(str) {
    if ('quit\r\n' === str || 'quit' === str) { 
      connection.end();
      return;
    }
    this.emit('data', str);
  })  
}


net.createServer(function(connection) {
  var stream = connection.pipe(strStream());

  stream
    .pipe(quitStream(connection))
    .pipe(upperStream())
    .pipe(connection);

  stream.pipe(process.stdout);

}).listen(8124);
