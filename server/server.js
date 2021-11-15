//module imports
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const vhost = require('vhost')
//custom module imports
const initRoutes = require('./routes/init.routes')
const connectDb = require('./db/connectDb')

const PORT = process.env.PORT || 5000

app.use(express.json())
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

