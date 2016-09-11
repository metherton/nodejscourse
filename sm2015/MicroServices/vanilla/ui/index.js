#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var net = require('net');
var JSONStream = require('JSONStream');
var es = require('event-stream');

if (!argv.acn) { 
  return console.error('Need an acn');
}

var ps = net.connect(2015)

ps.write(JSON.stringify({sub: 'balance'}))
ps.write(JSON.stringify({pub: ['check-balance', {acn:argv.acn}]}))

ps
  .pipe(JSONStream.parse())
  .pipe(es.map(function (o, cb) {
    if (o.topic === 'balance' && o.data.acn === argv.acn) {
      cb(null, 'acn: ' + o.data.acn + '\nbalance: ' + o.data.balance);
      ps.end()
    }
  }))
  .pipe(es.through(console.log))
