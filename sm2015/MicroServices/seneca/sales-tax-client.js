"use strict";

var util = require('util');

var seneca = require('seneca')().client();

function print(err, result) {
  if (err) { return console.error(err); }
  console.log(util.inspect(result).replace(/\n/g,' '));
}

seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'IE'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'UK'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'US', state:'AL'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'US', state:'AL', city:'Montgomery'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'US', state:'AK'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'US', state:'NY'}, print);
seneca.act({plugin:'salestax', cmd:'salestax', net:100, country:'US', state:'NY', category:'clothing', county:'Nassau'}, print);
