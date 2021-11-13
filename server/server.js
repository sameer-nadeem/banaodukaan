require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const path = require('path')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))
const initRoutes = require('./routes/init.route')
const connectDb = require('./db/connectDb')
app.use(cors())

connectDb()
initRoutes(app)

app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

