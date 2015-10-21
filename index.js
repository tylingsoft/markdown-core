$(function(){
  // inline math
  md.renderer.rules.code_inline = function(token, idx) {
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

  mermaid.parseError = function(err, hash){
    window.mermaidError = err;
  };
  // math block
  md.renderer.rules.fence = function(token, idx) {
    var code = token[idx].content.trim();
    var firstLine = code.split(/\n/)[0].trim();
    if(token[idx].info == 'math') {
      var tex = '';
      code.split(/\n\n/).forEach(function(line){ // 连续两个换行，则开始下一个公式
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
    } else if (token[idx].info == '') { // 没有指明语言
      // mermaid
      if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
        if(firstLine === 'sequenceDiagram') {
          code += '\n'; // 如果末尾没有空行，则语法错误
        }
        if(mermaid.parse(code)) {
          return '<div class="mermaid">' + code + '</div>';
        } else {
          return '<pre>' + window.mermaidError + '</pre>';
        }
      } else {
        return '<pre><code>' + code + '</code></pre>';
      }
    } else { // 明确指明了语言
      return '<pre><code class="language-' + token[idx].info + '">' + code + '</code></pre>';
    }
  }

  $.get('sample.md',function(data){
    var result = md.render(data);
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    if($('.mermaid').length > 0) {
      mermaid.init();
    }
  });
});
