var mdc = require('markdown-it')({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});


mdc.init = function(markdown, debug) {
	var result = mdc.render(markdown);
	if(debug === true) {
	  console.log(result);
	}
}

module.exports = mdc;
