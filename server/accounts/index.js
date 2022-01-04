const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const merchantRouter = require("./routes/merchant.routes")

app.use('/api/auth', authRouter)
app.use('/api/merchant',merchantRouter)


module.exports = app
