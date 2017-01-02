import asciimath2latex from 'asciimath-to-latex'
import katex from 'katex'
import hljs from 'highlight.js'

import Engine from './engine'

let options = {
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
}
let extensions = [
  'mark', 'ins', 'sub', 'sup', 'deflist', 'abbr', 'footnote', 'container', 'github-toc',
  'emoji', 'font-awesome', 'task-list'
]
let mdc = new Engine(options, extensions).mdc

// source map
mdc.map = false
const temp1 = mdc.renderer.renderToken.bind(mdc.renderer)
mdc.renderer.renderToken = function (tokens, idx, options) {
  let token = tokens[idx]
  if (token.type.endsWith('_open')) {
    if (mdc.map && token.level === 0 && token.map != null) {
      token.attrPush(['data-source-line', token.map[0] + 1])
    }
  }
  return temp1(tokens, idx, options)
}

// inline math
mdc.renderer.rules.code_inline = function (tokens, idx) {
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
mdc.math_block = function (code, map) {
  let tex = ''
  code.split(/(?:\n\s*){2,}/).forEach(function (line) { // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true })
    } catch (err) {
      tex += `<pre>${err}</pre>`
    }
  })
  return `<div${map}>${tex}</div>`
}

// chart block
mdc.chart_block = function (code, map) {
  try {
    let json = JSON.parse(code)
    return `<canvas${map} class="chartjs">${JSON.stringify(json)}</canvas>`
  } catch (e) { // JSON.parse exception
    return `<pre>${e}</pre>`
  }
}

// placeholder for mermaid
mdc.mermaid_charts = function (code, map) {
  return `<div${map} class="mermaid">${code}</div>`
}

// fence block
mdc.renderer.rules.fence = function (tokens, idx) {
  let token = tokens[idx]
  let code = token.content.trim()
  let map = mdc.map ? ` data-source-line="${token.map[0] + 1}"` : ''
  if (token.info === 'math' || token.info === 'katex') { // math
    return mdc.math_block(code, map)
  }
  if (/^ascii-?math/i.test(token.info)) {
    code = code.split(/(?:\n\s*){2,}/).map(function (item) { return asciimath2latex(item) }).join('\n\n')
    return mdc.math_block(code, map)
  }
  if (token.info === 'chart') { // chart
    return mdc.chart_block(code, map)
  }
  if (token.info === 'mermaid') { // mermaid
    return mdc.mermaid_charts(code, map) // mermaid
  }
  if (token.info.length > 0) { // programming language
    return `<pre${map}><code class="hljs">${hljs.highlightAuto(code, [token.info]).value}</code></pre>`
  }
  let firstLine = code.split(/\n/)[0].trim()
  if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return mdc.mermaid_charts(code, map) // mermaid
  }
  // unknown programming language
  return `<pre${map}><code class="hljs">${hljs.highlightAuto(code, ['unknown']).value}</code></pre>`
}

// code block
mdc.renderer.rules.code_block = (tokens, idx) => {
  let token = tokens[idx]
  let code = token.content.trim()
  let map = mdc.map ? ` data-source-line="${token.map[0] + 1}"` : ''
  return `<pre${map}><code class="hljs">${hljs.highlightAuto(code, ['unknown']).value}</code></pre>`
}

export default mdc
