import markdownIt from 'markdown-it'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownitContainer from 'markdown-it-container'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItGithubToc from 'markdown-it-github-toc'
import markdownitIcons from 'markdown-it-icons'
import markdownItTaskList from 'markdown-it-task-list'
import markdownItSourceMap from 'markdown-it-source-map'
import markdownItHighlight from 'markdown-it-highlight'
import markdownItLatex from 'markdown-it-latex'
import markdownItChart from 'markdown-it-chart'

class Engine {
  constructor (options = {}, plugins = []) {
    this.mdc = markdownIt(options)
    if (options.linkify === true) {
      this.mdc.linkify.set({ fuzzyLink: false })
    }
    plugins.forEach((plugin) => {
      switch (plugin) {
        case 'mark':
          this.mdc.use(markdownItMark)
          break
        case 'ins':
          this.mdc.use(markdownItIns)
          break
        case 'sub':
          this.mdc.use(markdownItSub)
          break
        case 'sup':
          this.mdc.use(markdownItSup)
          break
        case 'deflist':
          this.mdc.use(markdownItDeflist)
          break
        case 'abbr':
          this.mdc.use(markdownItAbbr)
          break
        case 'footnote':
          this.mdc.use(markdownItFootnote)
          break
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
        case 'task-list':
          this.mdc.use(markdownItTaskList)
          break
        case 'source-map':
          this.mdc.use(markdownItSourceMap)
          break
        case 'highlight':
          this.mdc.use(markdownItHighlight)
          break
        case 'latex':
          this.mdc.use(markdownItLatex)
          break
        case 'chart':
          this.mdc.use(markdownItChart)
          break
        default:
          break
      }
    })
  }
}

export default Engine
