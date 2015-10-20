$(function(){
  var md = window.markdownit();
  $.get('sample.md',function(data){
    var result = md.render(data);
    $('article.markdown-body').html(result);
  });
});
