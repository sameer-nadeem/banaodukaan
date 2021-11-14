require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const path = require('path')
const app = express()
const cors = require('cors')
const initRoutes = require('./routes/init.routes')
const connectDb = require('./db/connectDb')

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, '../store-portal/build')))
app.use(cors())

connectDb()
initRoutes(app)

app.use('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../store-portal', 'build', 'index.html'))
})


app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

