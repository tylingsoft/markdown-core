import Engine from './engine'

const options = { html: true, linkify: true }
const plugins = [
  'mark', 'ins', 'sub', 'sup', 'deflist', 'abbr', 'footnote', 'container',
  'github-toc', 'emoji', 'font-awesome', 'task-list', 'source-map', 'highlight',
  'latex', 'chart', 'mermaid'
]
const mdc = new Engine(options, plugins).mdc

export default mdc
