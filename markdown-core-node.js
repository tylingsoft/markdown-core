require('babel-polyfill');
var Chart = require('chart.js');


// markdown-it
var mdc = require('markdown-it')({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});
mdc.linkify.set({ fuzzyLink: false });


// markdown-it plugins
mdc = mdc.use(require('markdown-it-mark'));
mdc = mdc.use(require('markdown-it-ins'));
mdc = mdc.use(require('markdown-it-sub'));
mdc = mdc.use(require('markdown-it-sup'));
mdc = mdc.use(require('markdown-it-footnote'));
mdc = mdc.use(require('markdown-it-abbr'));
mdc = mdc.use(require('markdown-it-deflist'));
mdc = mdc.use(require('markdown-it-github-toc'), {
  tocFirstLevel: 2,
  tocLastLevel: 3,
  tocClassName: 'toc',
  anchorLinkSymbol: '',
  anchorLinkSpace: false,
  anchorClassName: 'anchor',
  anchorLinkSymbolClassName: 'octicon octicon-link',
});

var markdownitContainer = require('markdown-it-container');
mdc = mdc.use(markdownitContainer, 'success');
mdc = mdc.use(markdownitContainer, 'info');
mdc = mdc.use(markdownitContainer, 'warning');
mdc = mdc.use(markdownitContainer, 'danger');

mdc = mdc.use(require('markdown-it-icon'));
var emojione =require('emojione');
emojione.cacheBustParam = ''; // change this to invalidate emojione icons cache
emojione.imagePathPNG = 'https://cdn.jsdelivr.net/emojione/assets/png/';
mdc.renderer.rules.emoji = function(tokens, idx) {
  var shortname = tokens[idx].markup;
  if(shortname.startsWith('fa-')) { // fontawesome
    return `<i class="fa ${ shortname }"></i>`;
  }
  if(shortname.startsWith('ion-')) { // ionicons
    return `<i class="${ shortname }"></i>`;
  }
  return emojione.shortnameToImage(`:${ shortname }:`); // emojione
};


mdc.map = false;
mdc.tags = {};
mdc.renderer.renderToken = function(tokens, idx, options) {
  var token = tokens[idx];
  var tag = token.type;
  if(tag.endsWith('_open')) {
    var _tag = tag.substr(0, tag.length - 5);
    mdc.tags[_tag] = (mdc.tags[_tag] || 0) + 1;

    // source map
    if(mdc.map && token.level == 0 && token.map != null) {
      token.attrPush(['data-source-line', token.map[0] + 1]);
    }

  } else if (tag.endsWith('_close')) {
    var _tag = tag.substr(0, tag.length - 6);
    mdc.tags[_tag] = (mdc.tags[_tag] || 0) - 1;
  }

  // task list
  if((mdc.tags['bullet_list'] || 0) > 0 && tag == 'list_item_open'
      && (tokens[idx+2].content.startsWith('[ ] ') || tokens[idx+2].content.startsWith('[x] '))) {
    token.attrPush(['class', 'task-list-item']);
  }

  return mdc.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options);
}


mdc.renderer.renderInline = function (tokens, options, env) {
  var result = mdc.renderer.constructor.prototype.renderInline.call(this, tokens, options, env);

  // task list
  if((mdc.tags['bullet_list'] || 0) > 0 && (mdc.tags['list_item'] || 0) > 0) {
    if(tokens[0].content.startsWith('[ ] ')) {
      return '<input type="checkbox" disabled /> ' + result.substr(4);
    } else if(tokens[0].content.startsWith('[x] ')) {
      return '<input type="checkbox" disabled checked /> ' + result.substr(4);
    }
  }

  return result;
}


var katex = require('katex');
// inline math
mdc.renderer.rules.code_inline = function(tokens, idx) {
  var code = tokens[idx].content;
  if(code.startsWith('$') && code.endsWith('$')) { // inline math
    code = code.substr(1, code.length-2);
    try{
      return katex.renderToString(code);
    } catch(err) {
      return `<code>${ err }</code>`;
    }
  }
  return `<code>${ mdc.utils.escapeHtml(code) }</code>`; // not math
}


// math block
mdc.math_block = function(code, map) {
  var tex = '';
  code.split(/(?:\n\s*){2,}/).forEach(function(line) { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true });
    } catch(err) {
      tex += `<pre>${ err }</pre>`;
    }
  });
  return `<div${ map }>${ tex }</div>`;
}


// chart block
mdc.chart_block = function(code, map) {
  try {
    var json = JSON.parse(code);
    return `<canvas${ map } class="chartjs">${ JSON.stringify(json) }</canvas>`;
  } catch (e) { // JSON.parse exception
    return `<pre>Invalid JSON string</pre>`;
  }
}


// placeholder for mermaid
mdc.mermaid_charts = function(code, map) {
  return `<div${ map } class="mermaid">${ code }</div>`;
}


var hljs = require('highlight.js');
// fence block
mdc.renderer.rules.fence = function(tokens, idx) {
  var token = tokens[idx];
  var code = token.content.trim();
  var map = mdc.map ? ` data-source-line="${ token.map[0] + 1 }"` : '';
  if(token.info == 'math') { // math
    return mdc.math_block(code, map);
  }
  if(token.info == 'chart') { // chart
    return mdc.chart_block(code, map);
  }
  if(token.info.length > 0) { // programming language
    return `<pre${ map }><code class="hljs">${ hljs.highlightAuto(code, [token.info]).value }</code></pre>`;
  }
  var firstLine = code.split(/\n/)[0].trim();
  if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code, map); // mermaid
  }
  // unknown programming language
  return `<pre${ map }><code class="hljs">${ hljs.highlightAuto(code).value }</code></pre>`;
}


// code block
mdc.renderer.rules.code_block = (tokens, idx) => {
  var token = tokens[idx];
  var code = token.content.trim();
  var map = mdc.map ? ` data-source-line="${ token.map[0] + 1 }"` : '';
  return `<pre${ map }><code class="hljs">${ hljs.highlightAuto(code).value }</code></pre>`;
}


module.exports = mdc;
