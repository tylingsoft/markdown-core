import asciimath2latex from 'asciimath-to-latex'
import katex from 'katex'

import Engine from './engine'

const options = { html: true, linkify: true }
const extensions = [
  'mark', 'ins', 'sub', 'sup', 'deflist', 'abbr', 'footnote', 'container', 'github-toc',
  'emoji', 'font-awesome', 'task-list', 'source-map', 'highlight'
]
let mdc = new Engine(options, extensions).mdc

// inline math
mdc.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
  let code = tokens[idx].content
  if (code.startsWith('@') && code.endsWith('@')) {
    code = '$' + asciimath2latex(code.substr(1, code.length - 2)) + '$'
  }
  if (code.startsWith('$') && code.endsWith('$')) { // inline math
    code = code.substr(1, code.length - 2)
    try {
      return katex.renderToString(code)
    } catch (err) {
      return `<code>${err}</code>`
    }
  }
  return `<code>${mdc.utils.escapeHtml(code)}</code>` // not math
}

// math block
mdc.math_block = (code) => {
  let tex = ''
  code.split(/(?:\n\s*){2,}/).forEach((line) => { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true })
    } catch (err) {
      tex += `<pre>${err}</pre>`
    }
  })
  return `<div>${tex}</div>`
}

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
  if (token.info === 'math' || token.info === 'katex') { // math
    return mdc.math_block(code)
  }
  if (/^ascii-?math/i.test(token.info)) {
    code = code.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
    return mdc.math_block(code)
  }
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
