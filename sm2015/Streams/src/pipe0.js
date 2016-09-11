'use strict';

var fs = require('fs');

var inStream = fs.createReadStream(__filename);

inStream.pipe(process.stdout);
