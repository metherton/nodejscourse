var net = require('net');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var fees = {
  'Different Bank PLC': "1.23"
};

//connect to pubsub server
var ps = net.connect(2015)

//subscribe to topics
ps.write(JSON.stringify({sub: 'check-balance'}))

ps.pipe(JSONStream.parse())
  .pipe(es.map(chargeables))
  .pipe(JSONStream.stringify('','',''))
  .pipe(ps)



function chargeables(msg, cb) {
  if (msg.topic !== 'check-balance') {return cb();}

  //not an in-house acn, it's chargeable
  if (/^8[0-9]+/.test(msg.data.acn+'')) {
    msg.data.rcpt = 'Different Bank PLC';
    msg.data.fee = fees[msg.data.rcpt];
    return cb(null, {pub: [
      'bank-balance-fee', 
      msg.data
    ]})
  }

  cb();
}