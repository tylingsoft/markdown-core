$(function(){
  var md = window.markdownit({
      html: true,
      xhtmlOut: true,
      linkify: true
    })
    .use(window.markdownitEmoji);
  md.renderer.rules.emoji = function(token, idx) {
    return emojione.shortnameToImage(':' + token[idx].markup + ':');
  };
  emojione.cacheBustParam = '';
  $.get('sample.md',function(data){
    var result = md.render(data);
    console.log(result); // for debug
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
});
