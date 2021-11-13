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

app.use(cors())

connectDb()
initRoutes(app)

app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

