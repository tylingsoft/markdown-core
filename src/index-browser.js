import 'github-css'

import mdc from './index-node'
import Chart from 'chart.js'
import Cookies from 'js-cookie'

import mermaid from 'mermaid'

// import 'mermaid/dist/mermaid.css'
import 'markdown-it-latex/dist/index.css'
import 'markdown-it-icons/dist/index.css'
import 'markdown-it-highlight/dist/index.css'
import './index.css'

window.mermaid = mermaid

mdc.loadPreferences = () => {
  let ganttAxisFormat = Cookies.get('gantt-axis-format')
  if (ganttAxisFormat === undefined) {
    ganttAxisFormat = '%Y-%m-%d'
  }
  // window.mermaid.gantt.axisFormat(ganttAxisFormat)
  return { 'gantt-axis-format': ganttAxisFormat }
}
mdc.loadPreferences()

mdc.inited = () => {
  // this is a hook method
}
mdc.init = (markdown) => {
  let result = mdc.render(markdown)
  document.getElementById('preview').innerHTML = result

  // mermaid
  window.mermaid.init(undefined, document.querySelectorAll('#preview .mermaid'))

  // charts
  document.querySelectorAll('#preview .chartjs').forEach(element => {
    try {
      new Chart(element, JSON.parse(element.textContent)) // eslint-disable-line no-new
    } catch (e) {
      element.outerHTML = `<pre>Chart.js complains: "${e}"</pre>`
    }
  })

  mdc.inited()
}

export default mdc
