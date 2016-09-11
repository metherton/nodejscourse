var _ = require('underscore');


module.exports = function (/*options*/) {
  var seneca = this;
  var plugin = 'salestax';


  seneca.add({plugin: plugin, cmd: 'salestax'}, cmdSalestax);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'IE'}, cmdSalestaxIE);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'UK'}, cmdSalestaxUK);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'US'}, cmdSalestaxUS);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'US', state: 'AL'}, cmdSalestaxUSAL);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'US', state: 'AL', city: 'Montgomery'}, cmdSalestaxUSALM);
  seneca.add({plugin: plugin, cmd: 'salestax', country: 'US', state: 'NY'}, cmdSalestaxUSNY);

  function cmdSalestax(args, callback) {
    var rate = null == args.rate ? 0 : args.rate;
    var total = args.net * (1 + rate);
    callback(null, {total: total, rate: rate});
  }


  function cmdSalestaxIE(args, callback) {
    var rate = 0.23;
    seneca.act({plugin: plugin, cmd: 'salestax', rate: rate, net: args.net}, 
                addFields(args, callback));
  }


  function cmdSalestaxUK(args, callback) {
    var rate = 0.20;
    seneca.act({plugin: plugin, cmd: 'salestax', rate: rate, net: args.net}, 
                addFields(args, callback));
  }


  function cmdSalestaxUS(args, callback) {
    var rate = 0.0;
    seneca.act({plugin: plugin, cmd: 'salestax', rate: rate, net: args.net}, 
                addFields(args, callback));
  }


  function cmdSalestaxUSAL(args, callback) {
    var rate = 0.04;
    seneca.act({plugin:plugin, cmd:'salestax', rate:rate, net:args.net}, 
                addFields(args, callback));
  }


  function cmdSalestaxUSALM(args, callback) {
    var rate = 0.10;
    seneca.act({plugin: plugin, cmd: 'salestax', rate: rate, net: args.net}, 
                addFields(args, callback));
  }

  function cmdSalestaxUSNY(args, callback) {
    var rate = 0.07;
    var specialCounty = {'Dutchess': 1, 'Nassau': 1};
    
    if ('clothing' === args.category && specialCounty[args.county] && args.net <= 110) {
      rate = 0.0;
      args.special = true;
    }

    seneca.act({plugin: plugin, cmd: 'salestax', rate:rate, net:args.net}, 
                addFields(args, callback));
  }

  function addFields(args, callback){
    return function(err, result){
      callback(err, _.extend(result, {
        country: args.country,
        state: args.state,
        city: args.city,
        county: args.county
      }));
    };
  } 

  return {
    name: 'salestax'
  };
};
