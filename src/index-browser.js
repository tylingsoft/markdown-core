import mdc from './index-node'
import Chart from 'chart.js'
import $ from 'jquery'
import Cookies from 'js-cookie'

// mermaid charts
mdc.mermaid = {
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
mdc.init = (markdown) => {
  let result = mdc.render(markdown)
  document.getElementById('preview').innerHTML = result

  // mermaid
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
