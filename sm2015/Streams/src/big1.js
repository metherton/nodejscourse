var request = require('request');
var JSONStream = require('JSONStream');

request('http://registry.npmjs.org/-/all')
  .pipe(JSONStream.parse('*.name', function (name) { 
  	return name + '\n'; 
  }))
  .pipe(process.stdout)
 //   .pipe(require('fs').createWriteStream('/tmp/foo'))
// uncommment can pip to file instead of stdout