// markdown-it
window.mdc = window.markdownit({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});

// Configuration for Gantt diagrams
mermaid.ganttConfig = {
  axisFormatter: [
    ["%-m/%-d", function (d) {
        return d.getDay() == 1;
    }]
  ]
};

// subscript & superscript
mdc = mdc.use(window.markdownitSub);
mdc = mdc.use(window.markdownitSup);

// footnote
mdc = mdc.use(window.markdownitFootnote);

// containers
mdc = mdc.use(window.markdownitContainer, 'success');
mdc = mdc.use(window.markdownitContainer, 'info');
mdc = mdc.use(window.markdownitContainer, 'warning');
mdc = mdc.use(window.markdownitContainer, 'danger');

// abbreviations
mdc = mdc.use(window.markdownitAbbr);

// definition list
mdc = mdc.use(window.markdownitDeflist);

// insert & mark
mdc = mdc.use(window.markdownitIns);
mdc = mdc.use(window.markdownitMark);

// icons
mdc = mdc.use(window.markdownitIcons);
emojione.cacheBustParam = ''; // change this to invalidate emojione icons cache
emojione.imagePathPNG = 'https://cdn.jsdelivr.net/emojione/assets/png/';
mdc.renderer.rules.emoji = function(tokens, idx) {
  var shortname = tokens[idx].markup;
  if(shortname.startsWith('fa-')) { // fontawesome
    return '<i class="fa ' + shortname + '"></i>';
  }
  if(shortname.startsWith('ion-')) { // ionicons
    return '<i class="' + shortname + '"></i>';
  }
  return emojione.shortnameToImage(':' + shortname + ':'); // emojione
};


mdc.tokens = {};
mdc.renderer.renderToken = function(tokens, idx, options) {
  var token = tokens[idx];
  var tag = token.type;
  if (tag.endsWith('_open')) {
    mdc.tokens[tag.substr(0, tag.length - 5)] = true;
    if(token.level == 0 && token.map != null) {
      token.attrPush(['data-source-line', token.map[0] + 1]);
    }
  } else if (tag.endsWith('_close')) {
    mdc.tokens[tag.substr(0, tag.length - 6)] = false;
  }

  // task list
  if(mdc.tokens['bullet_list'] == true && tag == 'list_item_open' && (tokens[idx+2].content.startsWith('[ ] ') || tokens[idx+2].content.startsWith('[x] '))) {
    token.attrPush(['class', 'task-list-item']);
    tokens[idx+2].children[0].content = tokens[idx+2].children[0].content.substring(4);
    if(tokens[idx+2].content.startsWith('[ ] ')) { // unfinished task
      return mdc.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options) + '<input type="checkbox" disabled /> ';
    }
    // finished task
    return mdc.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options) + '<input type="checkbox" disabled checked /> ';
  }

  return mdc.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options);
}


// inline math
mdc.renderer.rules.code_inline = function(tokens, idx) {
  var code = tokens[idx].content;
  if(code.startsWith('$') && code.endsWith('$')) { // inline math
    code = code.substr(1, code.length-2);
    try{
      return katex.renderToString(code);
    } catch(err) {
      return '<code>' + err + '</code>';
    }
  }
  return '<code>' + code + '</code>'; // not math
}


// math block
mdc.math_block = function(code, line) {
  var tex = '';
  code.split(/(?:\n\s*){2,}/).forEach(function(line) { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true });
    } catch(err) {
      tex += '<pre data-source-line="' + line + '">' + err + '</pre>';
    }
  });
  return '<div data-source-line="' + line + '">' + tex + '</div>';
}


// mermaid charts
mermaid.parseError = function(err, hash){
  mdc.mermaidError = err;
};
mdc.mermaid_charts = function(code, line) {
  if(code.startsWith('sequenceDiagram')) {
    code += '\n'; // append empty line to the end, otherwise syntax error. It's a bug of mermaid.
  }
  if(mermaid.parse(code)) {
    return '<div data-source-line="' + line + '" class="mermaid">' + code + '</div>';
  } else {
    return '<pre data-source-line="' + line + '">' + mdc.mermaidError + '</pre>';
  }
}


// fence block
mdc.renderer.rules.fence = function(tokens, idx) {
  var token = tokens[idx];
  var code = token.content.trim();
  if(token.info == 'math') { // math
    return mdc.math_block(code, token.map[0] + 1);
  }
  if(token.info.length > 0) { // programming language
    return '<pre data-source-line="' + (token.map[0] + 1) + '"><code class="hljs">' + hljs.highlightAuto(code, [token.info]).value + '</code></pre>';
  }
  var firstLine = code.split(/\n/)[0].trim();
  if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code, token.map[0] + 1) // mermaid
  }
  return '<pre data-source-line="' + (token.map[0] + 1) + '"><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>'; // unknown programming language
}


// code block
mdc.renderer.rules.code_block = function(tokens, idx) {
  var token = tokens[idx];
  var code = token.content.trim();
  return '<pre data-source-line="' + (token.map[0] + 1) + '"><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>';
}


// convert markdown into HTML
mdc.init = function(markdown, debug) {
  var result = mdc.render(markdown);
  if(debug === true) {
    console.log(result);
  }
  $('article.markdown-body').html(result);
  if($('.mermaid').length > 0) {
    mermaid.init();
  }
}
