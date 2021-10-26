require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
const cors = require('cors')
const initRoutes = require('./routes/init.route')
const connectDb = require('./db/connectDb')
app.use(cors())

connectDb()
initRoutes(app)

app.listen(PORT, () => console.log(`Server started @PORT: ${PORT}`))

