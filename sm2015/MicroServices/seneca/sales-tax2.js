"use strict";

var _ = require('underscore');

var seneca = require('seneca')();


// no sales tax by default
seneca.add({cmd: 'salestax'}, function (args, callback) {
  var rate = null == args.rate ? 0 : args.rate;
  var total = args.net * (1 + rate);
  callback(null, {total: total, rate: rate});
});


// countries

function addFields(args, callback){
  return function(err, result) {
    callback(err, _.extend(result, {country: args.country, state: args.state}));
  };
} 

seneca.add({cmd: 'salestax', country: 'IE'}, function(args, callback) {
  var rate = 0.23;
  seneca.act({cmd: 'salestax', rate: rate, net:args.net}, 
              addFields(args,callback));
});

seneca.add({cmd: 'salestax', country: 'UK'}, function(args, callback) {
  var rate = 0.20;
  seneca.act({cmd: 'salestax', rate: rate, net:args.net},
              addFields(args, callback));
});


seneca.add({cmd: 'salestax', country: 'US'}, function(args, callback) {
  var rate = 0.0;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, 
              addFields(args,callback));
});

seneca.add({cmd: 'salestax', country: 'US', state: 'AL'}, function(args, callback) {
  var rate = 0.04;
  seneca.act({cmd: 'salestax', rate:rate, net: args.net}, 
              addFields(args,callback));
});

function print(err, result) {
  if (err) { return console.error(err); }
  console.dir(result);
}

seneca.act({cmd: 'salestax', net: 100, country: 'IE'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'UK'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state: 'AL'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state: 'AK'}, print);
