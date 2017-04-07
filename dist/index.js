import mdc from '../src/index-browser'
import $ from 'jquery'

const request = new window.XMLHttpRequest()
request.onload = function () {
  mdc.init(this.response, false)
  if (window.location.hash.length > 0) {
    $('html,body').scrollTop($(window.location.hash).offset().top - 8) // scroll to hash element
  }
}
request.open('GET', 'sample.md')
request.send()
