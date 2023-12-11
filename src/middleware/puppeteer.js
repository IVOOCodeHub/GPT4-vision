const puppeteer = require('puppeteer')

function takeScreenshotMiddleware() {
  return async (req, res, next) => {
    console.log('PUPPETEER : Starting browser...')
    const requestBody = req.body
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    console.log('PUPPETEER : Navigating to the page...')
    await page.goto(requestBody.url)

    console.log('PUPPETEER : take a screenshot...')
    await page.setViewport({ width: 1920, height: 1080 })
    await page.screenshot({
      path: './public/screenshots/screenshot.png',
      fullPage: true,
    })
    await browser.close()

    console.log('PUPPETEER : Done')
    next()
  }
}

module.exports = { takeScreenshotMiddleware }
