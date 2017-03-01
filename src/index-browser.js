import mdc from './index-node'
import Chart from 'chart.js'
import $ from 'jquery'
import Cookies from 'js-cookie'

import 'github-css/index.css'
import 'highlight.js/styles/atom-one-light.css'
import 'emojione/assets/css/emojione-awesome.css'
import './index.css'
import 'font-awesome/css/font-awesome.css'
import 'katex/dist/katex.min.css'

// convert an element to png image, aka screenshot an element
mdc.elementToPng = ($element) => {
  return '' // hook method, needs to be implemented in native code, such as Cocoa or WPF
}
// mermaid charts
mdc.mermaid = {
  toPng: () => {
    $($('article#preview div.mermaid > svg').get().reverse()).each((index, element) => { // reverse, so latter won't affect former
      let png = mdc.elementToPng($(element))
      $(element).replaceWith(`<img src="${png}"/>`)
    })
  },
  gantt: {
    axisFormat: (format) => {
      window.mermaid.ganttConfig = {
        axisFormatter: [
          [format, (d) => {
            return d.getDay() === 1
          }]
        ]
      }
    }
  }
}
// charts
mdc.charts = {
  toPng: () => {
    $($('canvas.chartjs').get().reverse()).each((index, element) => { // reverse, so latter won't affect former
      let png = mdc.elementToPng($(element))
      $(element).replaceWith(`<img src="${png}"/>`)
    })
  }
}
mdc.loadPreferences = () => {
  let ganttAxisFormat = Cookies.get('gantt-axis-format')
  if (ganttAxisFormat === undefined) {
    ganttAxisFormat = '%Y-%m-%d'
  }
  mdc.mermaid.gantt.axisFormat(ganttAxisFormat)
  return { 'gantt-axis-format': ganttAxisFormat }
}
mdc.loadPreferences()
window.mermaid.parseError = (err, hash) => {
  mdc.mermaidError = err
}
mdc.mermaid_charts = (code) => {
  if (window.mermaid.parse(code)) {
    return `<div class="mermaid">${code}</div>`
  } else {
    return `<pre>${mdc.mermaidError}</pre>`
  }
}

mdc.inited = () => {
  // this is a hook method
}
mdc.init = (markdown, debug) => {
  let result = mdc.render(markdown)
  if (debug === true) {
    console.log(result)
  }

  $('#preview').html(result)
  window.mermaid.init(undefined, $('#preview .mermaid'))

  // charts
  $('#preview .chartjs').each((index, element) => {
    try {
      let chart = new Chart($(element), JSON.parse($(element).text()))
      if (process.env.NODE_ENV === 'development') {
        console.log(chart.generateLegend())
      }
    } catch (e) {
      $(element).replaceWith(`<pre>Chart.js complains: "${e}"</pre>`)
    }
  })

  mdc.inited()
}

export default mdc
