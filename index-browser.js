const mdc = require('./index-node')
const Chart = require('chart.js')
const $ = require('jquery')
const Cookies = require('js-cookie')

require('github-css/index.css')
require('highlight.js/styles/atom-one-light.css')
require('emojione/assets/css/emojione.css')
require('./index.css')
require('font-awesome/css/font-awesome.css')
require('ionicons/css/ionicons.css')
require('katex/dist/katex.min.css')

// convert an element to png image, aka screenshot an element
mdc.elementToPng = function ($element) {
  return '' // hook method, needs to be implemented in native code, such as Cocoa or WPF
}
// mermaid charts
mdc.mermaid = {
  toPng: function () {
    $($('article#preview div.mermaid > svg').get().reverse()).each(function () { // reverse, so latter won't affect former
      let png = mdc.elementToPng($(this))
      $(this).replaceWith(`<img src="${png}"/>`)
    })
  },
  gantt: {
    axisFormat: function (format) {
      mermaid.ganttConfig = {
        axisFormatter: [
          [format, function (d) {
            return d.getDay() === 1
          }]
        ]
      }
    }
  }
}
// charts
mdc.charts = {
  toPng: function () {
    $($('canvas.chartjs').get().reverse()).each(function () { // reverse, so latter won't affect former
      let png = mdc.elementToPng($(this))
      $(this).replaceWith(`<img src="${png}"/>`)
    })
  }
}
mdc.loadPreferences = function () {
  let ganttAxisFormat = Cookies.get('gantt-axis-format')
  if (ganttAxisFormat === undefined) {
    ganttAxisFormat = '%Y-%m-%d'
  }
  mdc.mermaid.gantt.axisFormat(ganttAxisFormat)
  return { 'gantt-axis-format': ganttAxisFormat }
}
mdc.loadPreferences()
mermaid.parseError = function (err, hash) {
  mdc.mermaidError = err
}
mdc.mermaid_charts = function (code, map) {
  if (mermaid.parse(code)) {
    return `<div${map} class="mermaid">${code}</div>`
  } else {
    return `<pre${map}>${mdc.mermaidError}</pre>`
  }
}

mdc.inited = function () {
  // this is a hook method
}
mdc.init = function (markdown, debug) {
  let result = mdc.render(markdown)
  if (debug === true) {
    console.log(result)
  }

  // 通过 cache 来防止 mermaid init 造成页面抖动
  $('#cache').show()
  $('#cache').html(result)
  mermaid.init(undefined, $('#cache .mermaid'))
  $('#cache').hide()
  $('#preview').html($('#cache').html())
  $('#cache').empty()

  // charts
  $('#preview .chartjs').each(function () {
    try {
      let chart = new Chart($(this), JSON.parse($(this).text()))
      if (process.env.NODE_ENV === 'development') {
        console.log(chart.generateLegend())
      }
    } catch (e) {
      $(this).replaceWith(`<pre>Chart.js complains: "${e}"</pre>`)
    }
  })

  mdc.inited()
}

module.exports = mdc
