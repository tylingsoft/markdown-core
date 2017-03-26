import Engine from './engine'

const options = { html: true, linkify: true }
const extensions = [
  'mark', 'ins', 'sub', 'sup', 'deflist', 'abbr', 'footnote', 'container', 'github-toc',
  'emoji', 'font-awesome', 'task-list', 'source-map', 'highlight', 'latex'
]
let mdc = new Engine(options, extensions).mdc

// chart block
mdc.chart_block = (code) => {
  try {
    let json = JSON.parse(code)
    return `<canvas class="chartjs">${JSON.stringify(json)}</canvas>`
  } catch (e) { // JSON.parse exception
    return `<pre>${e}</pre>`
  }
}

// placeholder for mermaid
mdc.mermaid_charts = (code) => {
  return `<div class="mermaid">${code}</div>`
}

// fence block
const fence = mdc.renderer.rules.fence.bind(mdc.renderer.rules)
mdc.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  let token = tokens[idx]
  let code = token.content.trim()
  if (token.info === 'chart') { // chart
    return mdc.chart_block(code)
  }
  if (token.info === 'mermaid') { // mermaid
    return mdc.mermaid_charts(code) // mermaid
  }
  let firstLine = code.split(/\n/)[0].trim()
  if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code) // mermaid
  }
  return fence(tokens, idx, options, env, slf)
}

export default mdc
