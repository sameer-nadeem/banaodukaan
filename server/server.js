//module imports
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const vhost = require('vhost')
var rfs = require('rotating-file-stream') // version 2.x
//importing all mongodb models
require('./models/brand.model')
require('./models/admin.model')
require('./models/collection.model')
require('./models/complaint.model')
require('./models/customer.model')
require('./models/inventory.model')
require('./models/merchant.model')
require('./models/orderTracking.model')
require('./models/payment.model')
require('./models/product.model')
require('./models/setting.model')
require('./models/store.model')
require('./models/tax.model')
require('./models/user.model')

//custom module imports
const initRoutes = require('./routes/init.routes')
const connectDb = require('./db/connectDb')

const PORT = process.env.PORT || 5000

app.use(express.json())
//logger setup
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms',
  { stream: accessLogStream }))
//logger setup end
app.use(vhost('*.*.com', (req, res, next) => {
  console.log(req.vhost[0])
  console.log(req.vhost[1])
  next()
}))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use(cors())

connectDb()
initRoutes(app)

app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

