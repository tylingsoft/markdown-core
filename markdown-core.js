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
mdc.renderer.rules.emoji = function(token, idx) {
  var shortname = token[idx].markup;
  if(shortname.startsWith('fa-')) { // fontawesome
    return '<i class="fa ' + shortname + '"></i>';
  }
  if(shortname.startsWith('ion-')) { // ionicons
    return '<i class="' + shortname + '"></i>';
  }
  return emojione.shortnameToImage(':' + shortname + ':'); // emojione
};


// task list
mdc.bullet_list = false
mdc.renderer.rules.bullet_list_open = function(token, idx) {
  mdc.bullet_list = true;
  return '<ul>';
}
mdc.renderer.rules.bullet_list_close = function(token, idx) {
  mdc.bullet_list = false;
  return '</ul>';
}
mdc.task_list_item = false;
mdc.renderer.rules.list_item_open = function(token, idx) {
  if(!mdc.bullet_list) {
    mdc.task_list_item = false;
    return '<li>';
  }
  var content = token[idx+2].content;
  if(content.startsWith('[ ] ') || content.startsWith('[x] ')) {
    mdc.task_list_item = true;
    return '<li class="task-list-item">';
  }
  mdc.task_list_item = false;
  return '<li>';
}
mdc.renderer.rules.list_item_close = function(token, idx) {
  mdc.task_list_item = false;
  return '</li>';
}
mdc.renderer.rules.text = function(token, idx) {
  var content = token[idx].content;
  if(!mdc.task_list_item) {
    return content;
  }
  if(idx !== 0) {
    return content;
  }
  if(content.startsWith('[ ] ')) {
    return '<input type="checkbox" disabled /> ' + content.substring(4);
  }
  if(content.startsWith('[x] ')) {
    return '<input type="checkbox" disabled checked /> ' + content.substring(4);
  }
  return content;
}


// inline math
mdc.renderer.rules.code_inline = function(token, idx) {
  var code = token[idx].content;
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
mdc.math_block = function(code) {
  var tex = '';
  code.split(/(?:\n\s*){2,}/).forEach(function(line) { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true });
    } catch(err) {
      tex += '<pre>' + err + '</pre>';
    }
  });
  return '<div>' + tex + '</div>';
}


// mermaid charts
mermaid.parseError = function(err, hash){
  mdc.mermaidError = err;
};
mdc.mermaid_charts = function(code) {
  if(code.startsWith('sequenceDiagram')) {
    code += '\n'; // append empty line to the end, otherwise syntax error. It's a bug of mermaid.
  }
  if(mermaid.parse(code)) {
    return '<div class="mermaid">' + code + '</div>';
  } else {
    return '<pre>' + mdc.mermaidError + '</pre>';
  }
}


// fence block
mdc.renderer.rules.fence = function(token, idx) {
  var code = token[idx].content.trim();
  if(token[idx].info == 'math') { // math
    return mdc.math_block(code);
  }
  if(token[idx].info.length > 0) { // programming language
    return '<pre><code class="hljs">' + hljs.highlightAuto(code, [token[idx].info]).value + '</code></pre>';
  }
  var firstLine = code.split(/\n/)[0].trim();
  if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code) // mermaid
  }
  return '<pre><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>'; // unknown programming language
}


// code block
mdc.renderer.rules.code_block = function(token, idx) {
  var code = token[idx].content.trim();
  return '<pre><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>';
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
