var mdc = require('markdown-it')({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});

mdc = mdc.use(require('markdown-it-mark'));
mdc = mdc.use(require('markdown-it-ins'));
mdc = mdc.use(require('markdown-it-sub'));
mdc = mdc.use(require('markdown-it-sup'));
mdc = mdc.use(require('markdown-it-footnote'));
mdc = mdc.use(require('markdown-it-abbr'));
mdc = mdc.use(require('markdown-it-deflist'));

var markdownitContainer = require('markdown-it-container');
mdc = mdc.use(markdownitContainer, 'success');
mdc = mdc.use(markdownitContainer, 'info');
mdc = mdc.use(markdownitContainer, 'warning');
mdc = mdc.use(markdownitContainer, 'danger');


mdc.init = function(markdown, debug) {
	var result = mdc.render(markdown);
	if(debug === true) {
	  console.log(result);
	}
}

module.exports = mdc;
