import markdownIt from 'markdown-it'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownitContainer from 'markdown-it-container'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'

let mdc = markdownIt({
  html: true,
  xhtmlOut: true, // <br /> instead of <br>
  linkify: true
})
mdc.linkify.set({ fuzzyLink: false })

mdc = mdc.use(markdownItMark)
mdc = mdc.use(markdownItIns)
mdc = mdc.use(markdownItSub)
mdc = mdc.use(markdownItSup)
mdc = mdc.use(markdownitContainer, 'success')
mdc = mdc.use(markdownitContainer, 'info')
mdc = mdc.use(markdownitContainer, 'warning')
mdc = mdc.use(markdownitContainer, 'danger')
mdc = mdc.use(markdownItDeflist)
mdc = mdc.use(markdownItAbbr)
mdc = mdc.use(markdownItFootnote)

export default mdc
