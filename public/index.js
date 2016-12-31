import mdc from '../src/index-browser'
import $ from 'jquery'

$(function () {
  mdc.map = true
  $.get('sample.md', function (data) {
    mdc.init(data, false)
    window.addEventListener('hashchange', function () { scrollBy(0, -8) }) // a little gap to top
    if (window.location.hash.length > 0) {
      $('html,body').scrollTop($(window.location.hash).offset().top - 8) // scroll to hash element
    }
  })
})
