// this file contains code which requires browser, thus not compatible with node.js


// convert an element to png image, aka screenshot an element
mdc.elementToPng = function($element) {
  return ''; // hook method, needs to be implemented in native code, such as Cocoa or WPF
}
// mermaid charts
mdc.mermaid = {
  toPng: function() {
    $($('article#preview div.mermaid > svg').get().reverse()).each(function() { // reverse, so latter won't affect former
      var png = mdc.elementToPng($(this));
      $(this).replaceWith(`<img src="${ png }"/>`);
    });
  },
  gantt: {
    axisFormat: function(format) {
      mermaid.ganttConfig = {
        axisFormatter: [
          [format, function(d) {
            return d.getDay() == 1;
          }]
        ]
      };
    }
  }
};
mdc.loadPreferences = function() {
  var gantt_axis_format = Cookies.get('gantt-axis-format');
  if(gantt_axis_format == undefined) {
    gantt_axis_format = '%-m/%-d';
  }
  mdc.mermaid.gantt.axisFormat(gantt_axis_format);
  return { 'gantt-axis-format': gantt_axis_format };
};
mdc.loadPreferences();
mermaid.parseError = function(err, hash) {
  mdc.mermaidError = err;
};
mdc.mermaid_charts = function(code, map) {
  if(mermaid.parse(code)) {
    return `<div${ map } class="mermaid">${ code }</div>`;
  } else {
    return `<pre${ map }>${ mdc.mermaidError }</pre>`;
  }
}


mdc.inited = function() {
  // this is a hook method
}
mdc.init = function(markdown, debug) {
  var result = mdc.render(markdown);
  if(debug === true) {
    console.log(result);
  }

  // 通过 cache 来防止 mermaid init 造成页面抖动
  // 通过 morphdom 来 patch dom，避免全部替换 dom 造成的性能损失 (可能并不值得这么做)
  morphdom($('#cache').get(0), `<article class="markdown-body" id="cache">${ result }</article>`);
  mermaid.init(undefined, $('#cache .mermaid'));
  $('#cache').hide();
  $('#preview').html($('#cache').html());

  mdc.inited();
}
