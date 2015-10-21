$(function(){
  $.get('sample.md',function(data){
    md.init(data);
  });
});
