$(function() {
  $.get('sample.md', function(data) {
    mdc.init(data, true);
  });
});
