import 'github-css'

import markdownIt from 'markdown-it'
import markdownitIcons from 'markdown-it-icons'
import markdownItHighlight from 'markdown-it-highlight'
import markdownItLatex from 'markdown-it-latex'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownitContainer from 'markdown-it-container'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItGithubToc from 'markdown-it-github-toc'
import markdownItTaskList from 'markdown-it-task-list'
import markdownItSourceMap from 'markdown-it-source-map'
import markdownItChart from 'markdown-it-chart'
import markdownItMermaid from 'markdown-it-mermaid'

import './index.css'

const pluginMap = {
  'mark': markdownItMark,
  'ins': markdownItIns,
  'sub': markdownItSub,
  'sup': markdownItSup,
  'deflist': markdownItDeflist,
  'abbr': markdownItAbbr,
  'footnote': markdownItFootnote,
  'task-list': markdownItTaskList,
  'source-map': markdownItSourceMap,
  'highlight': markdownItHighlight,
  'latex': markdownItLatex,
  'chart': markdownItChart,
  'mermaid': markdownItMermaid
}

class Engine {
  constructor (options = {}, plugins = []) {
    this.mdc = markdownIt(options)
    if (options.linkify === true) {
      this.mdc.linkify.set({ fuzzyLink: false })
    }
    plugins.filter((plugin) => pluginMap[plugin]).forEach((plugin) => {
      this.mdc.use(pluginMap[plugin])
    })
    plugins.filter((plugin) => !pluginMap[plugin]).forEach((plugin) => {
      switch (plugin) {
        case 'container':
          this.mdc.use(markdownitContainer, 'success')
          this.mdc.use(markdownitContainer, 'info')
          this.mdc.use(markdownitContainer, 'warning')
          this.mdc.use(markdownitContainer, 'danger')
          break
        case 'github-toc':
          this.mdc.use(markdownItGithubToc, {
            tocFirstLevel: 2,
            tocLastLevel: 3,
            tocClassName: 'toc',
            anchorLinkSymbol: '',
            anchorLinkSpace: false,
            anchorClassName: 'anchor',
            anchorLinkSymbolClassName: 'octicon octicon-link'
          })
          break
        case 'emoji':
        case 'font-awesome':
          this.mdc.use(markdownitIcons, plugin)
          break
        default:
          break
      }
    })
  }
}

export default Engine
