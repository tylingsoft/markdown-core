/* eslint-env mocha */
const spawn = require('child_process').spawn
const CDP = require('chrome-remote-interface')
const fs = require('fs')
const assert = require('assert')

const init = false

let chromeBin = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const chromeOptions = [
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--user-data-dir=/tmp/chrome-user-data-dir',
  '--no-default-browser-check',
  '--no-first-run',
  '--disable-default-apps',
  '--disable-popup-blocking',
  '--disable-translate',
  '--disable-background-timer-throttling',
  '--disable-device-discovery-notifications',
  '--window-size=1280,800'
]

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let chrome = null
const startChrome = () => {
  chrome = spawn(chromeBin, chromeOptions)
}
const quitChrome = () => {
  if (chrome != null) {
    chrome.kill('SIGINT')
  }
}

let httpServer = null
const startHttp = () => {
  httpServer = spawn('./node_modules/.bin/http-server', ['dist'])
}
const quitHttp = () => {
  if (httpServer != null) {
    httpServer.kill('SIGINT')
  }
}

const main = async (done) => {
  startHttp()
  startChrome()
  await timeout(3000)
  CDP(async (client) => {
    const { Page, Runtime } = client
    await Page.enable()
    await Page.navigate({ url: 'http://127.0.0.1:8080' })
    Page.loadEventFired(async () => {
      await timeout(3000)
      const html = (await Runtime.evaluate({ expression: 'document.documentElement.outerHTML' })).result.value
      if (init) {
        fs.writeFileSync('test/fixtures/index.html', html)
      }
      assert.equal(html, fs.readFileSync('test/fixtures/index.html', 'utf8'))
      const height = (await Runtime.evaluate({ expression: 'Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)' })).result.value
      const visibleHeight = (await Runtime.evaluate({ expression: 'window.innerHeight' })).result.value
      const times = Math.floor(height / visibleHeight)
      for (let i = 0; i < times; i++) {
        const screenshot = (await Page.captureScreenshot()).data
        if (init) {
          fs.writeFileSync(`test/fixtures/index-${i + 1}.png`, screenshot, 'base64')
        }
        assert.equal(screenshot, fs.readFileSync(`test/fixtures/index-${i + 1}.png`, 'base64'))
        await Runtime.evaluate({ expression: `window.scrollBy(0, ${visibleHeight})` })
      }
      const screenshot = (await Page.captureScreenshot()).data
      if (init) {
        fs.writeFileSync(`test/fixtures/index-${times + 1}.png`, screenshot, 'base64')
      }
      assert.equal(screenshot, fs.readFileSync(`test/fixtures/index-${times + 1}.png`, 'base64'))
      quitChrome()
      quitHttp()
      done()
    })
  }).on('error', (err) => {
    console.error('Cannot connect to browser:', err)
    quitChrome()
    quitHttp()
  })
}

describe('test', function () {
  this.timeout(32000)
  it('should work', function (done) {
    main(done)
  })
})
