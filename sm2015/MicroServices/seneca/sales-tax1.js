"use strict";

var _ = require('underscore');

var seneca = require('seneca')();

// no sales tax by default
seneca.add({cmd: 'salestax'}, function(args, callback) {
  var rate = null == args.rate ? 0 : args.rate;
  var total = args.net * (1 + rate);
  callback(null, {total: total});
});


// countries

function addCountry(country, callback) {
  return function(err, result) {
    callback(err, _.extend(result, {country: country}));
  };
}

seneca.add({cmd: 'salestax', country: 'IE'}, function(args, callback) {
  var rate = 0.23;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, addCountry(args.country, callback));
});

seneca.add({cmd: 'salestax', country: 'UK'}, function(args, callback) {
  var rate = 0.20;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, addCountry(args.country, callback));
});


function print(err, result) {
  if (err) { return console.error(err); }
  console.dir(result);
}

seneca.act({cmd: 'salestax', net: 100, country: 'IE'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'UK'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US'}, print);
