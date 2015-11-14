var mdc = require('./markdown-core-new.js');

var fs = require('fs');
fs.readFile('sample.md', 'utf-8', function(error, data){
	mdc.init(data, true);
});
