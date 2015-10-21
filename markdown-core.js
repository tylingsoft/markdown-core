window.md = window.markdownit({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
});

// icons
md = md.use(window.markdownitEmoji);
emojione.cacheBustParam = ''; // 当emojione的图片升级了，可以修改这个让浏览器的缓存失效
md.renderer.rules.emoji = function(token, idx) {
  var shortname = token[idx].markup;
  if(shortname.startsWith('fa-')) { // fontawesome
    return '<i class="fa ' + shortname + '"></i>';
  }
  if(shortname.startsWith('ion-')) { // ionicons
    return '<i class="' + shortname + '"></i>';
  }
  return emojione.shortnameToImage(':' + shortname + ':'); // emojione
};

// task list
window.task_list_item = false;
md.renderer.rules.list_item_open = function(token, idx) {
  var content = token[idx+2].content;
  if(content.startsWith('[ ] ') || content.startsWith('[x] ')) {
    window.task_list_item = true;
    return '<li class="task-list-item">';
  }
  return '<li>';
}
md.renderer.rules.list_item_close = function(token, idx) {
  window.task_list_item = false;
  return '</li>';
}
md.renderer.rules.text = function(token, idx) {
  var content = token[idx].content;
  if(window.task_list_item) {
    if(content.startsWith('[ ] ')) {
      return '<input type="checkbox" disabled /> ' + content.substring(4);
    }
    if(content.startsWith('[x] ')) {
      return '<input type="checkbox" disabled checked /> ' + content.substring(4);
    }
  }
  return content;
}
