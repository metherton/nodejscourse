var vstream = require('vstream');

var fs = require('fs');
var stream = require('stream');

var instream = fs.createReadStream('/usr/bin/more');
var passthru = new stream.PassThrough();
var outstream = fs.createWriteStream('/dev/null');

vstream.wrapStream(instream, 'source')
vstream.wrapStream(passthru, 'passthru')
vstream.wrapStream(outstream, 'devnull')

instream.pipe(passthru).pipe(outstream);

instream.on('data', report);
outstream.on('finish', report);

function report() {
	//walk the pipeline
    instream.vsWalk(function (stream) { 
    	//output debug info on each stream
    	stream.vsDumpDebug(process.stdout); 
    });

    console.log('---')
}
