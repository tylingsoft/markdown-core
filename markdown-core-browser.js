// this file contains code which requires browser, thus not compatible with node.js


// convert an element to png image, aka screenshot an element
mdc.elementToPng = function($element) {
    return ''; // hook method, needs to be implemented in native code, such as Cocoa or WPF
}
// mermaid charts
mdc.mermaid = {
    toPng: function() {
        $($('div.mermaid > svg').get().reverse()).each(function() { // reverse, so latter won't affect former
            var png = mdc.elementToPng($(this));
            $(this).replaceWith('<img src="' + png + '"/>');
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
mdc.mermaid_charts = function(code, line) {
  if(mermaid.parse(code)) {
    return '<div data-source-line="' + line + '" class="mermaid">' + code + '</div>';
  } else {
    return '<pre data-source-line="' + line + '">' + mdc.mermaidError + '</pre>';
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
  $('#hidden-content').html(result);
  $('#hidden-content').show();
  mermaid.init(undefined, $('#hidden-content .mermaid'));
  $('#hidden-content').hide();
  $('#main-content').html($('#hidden-content').html());
  $('#hidden-content').html('');
  mdc.inited();
}
