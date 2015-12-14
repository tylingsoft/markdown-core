// this file contains code which requires browser, thus not compatible with node.js


mdc.svgToPng = function(id) {
    return ''; // placeholder method.
}
// convert svg image to png image
function svgToPng(id, callback) {
    var svg = document.getElementById(id);
    var svgData = new XMLSerializer().serializeToString(svg);
    var img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    var ctx = canvas.getContext("2d");

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        var png = '';
        try {
            png = canvas.toDataURL("image/png");
        } catch(e) { // doesn't work in Safari for flowchart
            png = mdc.svgToPng(id); // hook method
        }
        callback(png);
    };
}


// mermaid charts
mdc.mermaid = {
    toPng: function() {
        $('div.mermaid > svg').each(function() {
            var id = $(this).attr('id');
            svgToPng(id, function(png) {
                $('#' + id).replaceWith('<img src="' + png + '"/>');
            });
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
mdc.mermaid.gantt.axisFormat('%-m/%-d');
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
  $('article.markdown-body').html(result);
  if($('.mermaid').length > 0) {
    mermaid.init();
  }
  mdc.inited();
}
