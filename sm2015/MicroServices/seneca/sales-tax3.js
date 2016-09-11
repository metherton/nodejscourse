"use strict";

var util = require('util');

var _ = require('underscore');

var seneca = require('seneca')();


// no sales tax by default
seneca.add({cmd: 'salestax'}, function(args, callback) {
  var rate = null == args.rate ? 0 : args.rate;
  var total = args.net * (1 + rate);
  callback(null,{total: total, rate: rate});
});

// countries

function addFields(args, callback){
  return function(err, result){
    callback( err, _.extend(result, {
      country: args.country,
      state: args.state,
      city: args.city,
      county: args.county
    }));
  };
} 

seneca.add({cmd: 'salestax', country: 'IE'}, function (args, callback) {
  var rate = 0.23;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, 
              addFields(args, callback));
});

seneca.add({cmd: 'salestax', country: 'UK'}, function (args, callback) {
  var rate = 0.20;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, 
              addFields(args,callback));
});


seneca.add({cmd:'salestax', country:'US'}, function (args, callback) {
  var rate = 0.0;
  seneca.act({cmd: 'salestax', rate: rate, net:args.net}, 
              addFields(args, callback));
});

seneca.add( {cmd: 'salestax',country: 'US',state: 'AL'}, function (args, callback) {
  var rate = 0.04;
  seneca.act({cmd: 'salestax', rate: rate, net: args.net}, 
              addFields(args, callback));
});

seneca.add({cmd: 'salestax', country: 'US', state: 'AL', city: 'Montgomery'}, function (args, callback) {
  var rate = 0.10;
  seneca.act({cmd: 'salestax', rate: rate, net:args.net}, 
              addFields(args, callback));
});

seneca.add({cmd: 'salestax', country: 'US', state: 'NY'}, function (args, callback) {
  var rate = 0.07;
  var specialCounty = {'Dutchess': 1, 'Nassau': 1};
  
  if ('clothing' === args.category && specialCounty[args.county] && args.net <= 110 ) {
    rate = 0.0;
    args.special = true;
  }

  seneca.act({cmd: 'salestax', rate: rate, net:args.net}, 
              addFields(args,callback));
});



function print(err, result) {
  if(err) { return console.error(err); }
  console.log(util.inspect(result).replace(/\n/g,' '));
}


seneca.act({cmd: 'salestax', net: 100, country: 'IE'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'UK'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state:'AL'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state:'AL', city:'Montgomery'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state:'AK'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state:'NY'}, print);
seneca.act({cmd: 'salestax', net: 100, country: 'US', state:'NY', category:'clothing', county:'Nassau'}, print);
