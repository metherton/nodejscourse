var net = require('net');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var capabilities = {
  'check-balance': checkBalance  
};
var balances = require('./balances.json');

//connect to pubsub server
var ps = net.connect(2015)

//subscribe to topics
ps.write(JSON.stringify({sub: 'check-balance'}))

//process messages
ps.pipe(JSONStream.parse())
  .pipe(es.through(function (msg) {
    if (msg.topic in capabilities) 
      this.queue(capabilities[msg.topic](msg.data))
  }))
  .pipe(JSONStream.stringify('','',''))
  .pipe(ps)


function checkBalance(info) {
  return {pub: [
   'balance', 
   {acn: info.acn, balance: balances[info.acn]}
  ]};
}



