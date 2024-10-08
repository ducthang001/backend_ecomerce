const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

// middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// test pub.sub redis
require('./tests/inventory.test')
const productTest = require('./tests/product.test')
productTest.purchaseProduct('product:001', 30)
//

// dbs
require('./dbs/connect.mongodb')
// route
app.use('', require('./routes'))
// handle error
app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
  })
});


module.exports = app