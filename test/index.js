const spawn = require('child_process').spawn
const CDP = require('chrome-remote-interface')
const fs = require('fs')

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
  '--window-size=800,600'
]
if (process.platform === 'linux') {
  chromeBin = '/usr/bin/google-chrome'
  chromeOptions.push('--headless')
}

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

const main = async () => {
  startHttp()
  startChrome()
  await timeout(3000)
  CDP(async (client) => {
    const { Page, Runtime } = client
    await Page.enable()
    await Page.navigate({ url: 'http://127.0.0.1:8080' })
    Page.loadEventFired(async () => {
      await timeout(3000)
      const result = await Runtime.evaluate({ expression: 'document.documentElement.outerHTML' })
      fs.writeFileSync('test/fixture/temp.html', result.result.value)
      const height = (await Runtime.evaluate({ expression: 'Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)' })).result.value
      const visibleHeight = (await Runtime.evaluate({ expression: 'window.innerHeight' })).result.value
      const times = Math.floor(height / visibleHeight)
      for (let i = 0; i < times; i++) {
        const screenshot = await Page.captureScreenshot()
        fs.writeFileSync(`test/fixture/temp-${i + 1}.png`, screenshot.data, 'base64')
        await Runtime.evaluate({ expression: `window.scrollBy(0, ${visibleHeight})` })
        await timeout(100)
      }
      const screenshot = await Page.captureScreenshot()
      fs.writeFileSync(`test/fixture/temp-${times + 1}.png`, screenshot.data, 'base64')
      quitChrome()
      quitHttp()
    })
  }).on('error', (err) => {
    console.error('Cannot connect to browser:', err)
    quitChrome()
    quitHttp()
  })
}

main()
