$(function(){
  var md = window.markdownit({
      html: true,
      xhtmlOut: true,
      linkify: true
    })
    .use(window.markdownitEmoji);
  md.renderer.rules.emoji = function(token, idx) {
    var shortname = token[idx].markup;
    if(shortname.startsWith('fa-')) {
      return '<i class="fa ' + shortname + '"></i>';
    } else {
      return emojione.shortnameToImage(':' + shortname + ':');
    }
  };
  emojione.cacheBustParam = ''; // or '?v=1.5.1'
  $.get('sample.md',function(data){
    var result = md.render(data);
    console.log(result); // for debug
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
});
