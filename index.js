$(function(){
  var md = window.markdownit({
      html: true,
      xhtmlOut: true,
      linkify: true
    })
    .use(window.markdownitEmoji);

  // emoji
  emojione.cacheBustParam = ''; // or '?v=1.5.1'
  md.renderer.rules.emoji = function(token, idx) {
    var shortname = token[idx].markup;
    if(shortname.startsWith('fa-')) {
      return '<i class="fa ' + shortname + '"></i>';
    } else {
      return emojione.shortnameToImage(':' + shortname + ':');
    }
  };

  // task list
  window.list_item = false;
  md.renderer.rules.list_item_open = function(token, idx) {
    window.list_item = true;
    return '<li>';
  }
  md.renderer.rules.list_item_close = function(token, idx) {
    window.list_item = false;
    return '</li>';
  }
  md.renderer.rules.text = function(token, idx) {
    var content = token[idx].content;
    if(window.list_item) {
      if(content.startsWith('[ ] ')) {
        content = '<input type="checkbox" disabled /> ' + content.substring(4);
      } else if(content.startsWith('[x] ')) {
        content = '<input type="checkbox" disabled checked /> ' + content.substring(4);
      }
    }
    return content;
  }

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

  // math block
  md.renderer.rules.fence = function(token, idx) {
    var code = token[idx].content;
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
    } else if (token[idx].info == '') {
      return '<pre><code>' + code + '</code></pre>';
    } else {
      return '<pre><code class="language-' + token[idx].info + '">' + code + '</code></pre>';
    }
  }

  $.get('sample.md',function(data){
    var result = md.render(data);
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
});
