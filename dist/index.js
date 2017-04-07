import mdc from '../src/index-browser'

const request = new window.XMLHttpRequest()
request.onload = function () {
  mdc.init(this.response, false)
  if (window.location.hash.length > 0) {
    const element = document.getElementById(window.location.hash.substr(1))
    if (element) {
      document.body.scrollTop = element.getBoundingClientRect().top
    }
  }
}
request.open('GET', 'sample.md')
request.send()
