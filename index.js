mdc.inited = function() {
  console.log('mdc inited');
}

$(function() {
  $.get('sample.md', function(data) {
    mdc.init(data, false);
  });
});
