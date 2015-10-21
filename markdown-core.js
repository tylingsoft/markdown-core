window.mdc = window.markdownit({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});


// icons
mdc = mdc.use(window.markdownitEmoji);
emojione.cacheBustParam = ''; // 当emojione的图片升级了，可以修改这个让浏览器的缓存失效
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
window.task_list_item = false;
mdc.renderer.rules.list_item_open = function(token, idx) {
  var content = token[idx+2].content;
  if(content.startsWith('[ ] ') || content.startsWith('[x] ')) {
    window.task_list_item = true;
    return '<li class="task-list-item">';
  }
  return '<li>';
}
mdc.renderer.rules.list_item_close = function(token, idx) {
  window.task_list_item = false;
  return '</li>';
}
mdc.renderer.rules.text = function(token, idx) {
  var content = token[idx].content;
  if(window.task_list_item) {
    if(content.startsWith('[ ] ')) {
      return '<input type="checkbox" disabled /> ' + content.substring(4);
    }
    if(content.startsWith('[x] ')) {
      return '<input type="checkbox" disabled checked /> ' + content.substring(4);
    }
  }
  return content;
}


// inline math
mdc.renderer.rules.code_inline = function(token, idx) {
  var code = token[idx].content;
  if(code.startsWith('$') && code.endsWith('$')) {
    code = code.substr(1, code.length-2);
    try{
      return katex.renderToString(code);
    } catch(err) {
      return '<code>' + err + '</code>';
    }
  }
  return '<code>' + code + '</code>';
}


// math block
mdc.math_block = function(code) {
  var tex = '';
  code.split(/\n\n/).forEach(function(line) { // 连续两个换行，则开始下一个公式
    line = line.trim();
    if(line.length > 0) {
      try {
        tex += katex.renderToString(line, { displayMode: true });
      } catch(err) {
        tex += '<pre>' + err + '</pre>';
      }
    }
  });
  return '<div>' + tex + '</div>';
}


// mermaid charts
mermaid.parseError = function(err, hash){
  window.mermaidError = err;
};
mdc.mermaid_charts = function(code) {
  if(code.startsWith('sequenceDiagram')) {
    code += '\n'; // append empty line to the end, otherwise syntax error. It's a bug of mermaid.
  }
  if(mermaid.parse(code)) {
    return '<div class="mermaid">' + code + '</div>';
  } else {
    return '<pre>' + window.mermaidError + '</pre>';
  }
}


// fence block
mdc.renderer.rules.fence = function(token, idx) {
  var code = token[idx].content.trim();
  if(token[idx].info == 'math') { // math
    return mdc.math_block(code);
  }
  if(token[idx].info.length > 0) { // programming language
    return '<pre><code class="language-' + token[idx].info + '">' + code + '</code></pre>';
  }
  var firstLine = code.split(/\n/)[0].trim();
  if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code) // mermaid
  }
  return '<pre><code>' + code + '</code></pre>'; // unknown programming language
}

mdc.init = function(markdown) {
  var result = mdc.render(markdown);
  $('article.markdown-body').html(result);
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  if($('.mermaid').length > 0) {
    mermaid.init();
  }
}
