require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const port = process.env.SERVER_PORT || 3030
const bookRouter = require('./routes/book')
const cors = require('cors')

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', bookRouter)
