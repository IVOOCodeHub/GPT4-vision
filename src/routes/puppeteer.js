const router = require('express').Router()

const puppeteerMiddleware = require('../middleware/puppeteer.js')
const baseURL = '/api'

router.get(baseURL + '/puppeteer', puppeteerMiddleware.takeScreenshotMiddleware())

module.exports = router