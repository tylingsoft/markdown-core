$(function(){
  var md = window.markdownit({
    linkify: true
  });
  $.get('sample.md',function(data){
    var result = md.render(data);
    $('article.markdown-body').html(result);
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });
});
