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
  '--window-size=1440,5000'
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

const main = async () => {
  startChrome()
  await timeout(3000)
  CDP(async (client) => {
    const { Page, Runtime } = client
    await Page.enable()
    await Page.navigate({ url: 'http://mdp.tylingsoft.com' })
    Page.loadEventFired(async () => {
      await timeout(6000)
      const result = await Runtime.evaluate({ expression: 'document.documentElement.outerHTML' })
      fs.writeFileSync('test/fixture/temp.html', result.result.value)
      const screenshot = await Page.captureScreenshot()
      fs.writeFileSync('test/fixture/temp.png', screenshot.data, 'base64')
      quitChrome()
    })
  }).on('error', (err) => {
    console.error('Cannot connect to browser:', err)
    quitChrome()
  })
}

main()