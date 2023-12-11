const puppeteer = require('puppeteer')

const AbsoluteScreenshotFolderUrl =
  'http://srv-web:8080/usv_mig_v1/GPT4-vision/public/screenshots'
const screenshotFolderUrl = './public/screenshots/screenshot.png'

function takeScreenshotMiddleware() {
  return async (req, res, next) => {
    let browser // declare browser variable to be used and closed in the block finally.

    try {
      console.log('PUPPETEER: Starting browser...')
      const requestBody = req.body
      browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage()

      console.log('PUPPETEER: Connecting to USV...')
      await connectPuppeteerToUSV(page)

      console.log('PUPPETEER: Navigating to the page...')
      await page.goto(requestBody.url)

      console.log('PUPPETEER: Take a screenshot...')
      await page.setViewport({ width: 1920, height: 1080 })
      await page.screenshot({
        path: screenshotFolderUrl,
        fullPage: true,
      })

      console.log('PUPPETEER: Done')
      res.status(201).json({
        message:
          'Puppeteer: Screenshot taken and saved in ' +
          AbsoluteScreenshotFolderUrl,
      })
    } catch (error) {
      console.error('Puppeteer error: ', error)
      res.status(500).json({ error: 'Puppeteer error: ' + error })
    } finally {
      if (browser) {
        await browser.close()
      }
      next()
    }
  }
}

async function connectPuppeteerToUSV(page) {
  await page.goto('http://srv-web:8080/usv_prod/menu0.asp')
  await page.type('input[name=identifiant]', `${process.env.USV_USERNAME}`)
  await page.type('input[name=mdp]', `${process.env.USV_PASSWORD}`)
  await page.keyboard.press('Enter')
  await page.waitForNavigation()
  console.log('PUPPETEER: Successfully connected to USV')
}

module.exports = { takeScreenshotMiddleware }
