var request = require('request');

request('http://registry.npmjs.org/-/all', function (err, res) {
	var recs = JSON.parse(res.body);
	var names = '';
	Object.keys(recs).forEach(function (key) {
		names += recs[key].name + '\n';
	});
	console.log(names);
});