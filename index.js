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

  $.get('sample.md',function(data){
    var result = md.render(data);
    console.log(result); // for debug
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
});
