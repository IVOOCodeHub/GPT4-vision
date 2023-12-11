// imports
const express = require('express')
const morgan = require('morgan')
const routePuppeteer = require('./src/routes/puppeteer.js')
// const gpt4VisionPreview = require('./src/middleware/gpt4VisionPreview.js')

// init app
const app = express() // create express app
app.use(morgan('dev')) // log every request to the console
app.use(express.json()) // to support JSON-encoded bodies

// routes
app.use(routePuppeteer)

// Démarrer le serveur
const port = 8800
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`)
})
