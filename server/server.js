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
const Store = require('./models/store.model')
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
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: accessLogStream
    }
  )
)

//logger setup end

//extract vhost and place it in req.vhost
app.use(cors())
app.use((req, res, next) => {
  console.log(req.hostname, req.path)
  next()
})
app.use(vhost("*.banaodukaan.com", async (req, res, next) => {

  const storeName = req.vhost[0]
  if (storeName === "accounts") return next()
  const store = await Store.findOne({
    title: storeName
  }).select("_id")

  if (!store)
    return res.sendFile(path.join(__dirname, 'static/404.html'))

  req.storeId = store._id
  next()
}))


app.use(vhost("accounts.banaodukaan.com", require('./accounts')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))



connectDb()
initRoutes(app)

app.use('/admin/', express.static(path.join(__dirname, "../store-portal", 'build')))
app.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, "../store-portal", 'build', 'index.html'));
});
app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

