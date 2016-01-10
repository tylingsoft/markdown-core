$(function() {
  mdc.map = true;
  $.get('sample.md', function(data) {
    mdc.init(data, false);
  });
});
