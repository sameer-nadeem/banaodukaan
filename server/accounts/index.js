const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const merchantRouter = require("./routes/merchant.routes")
const path = require('path')

app.use((req, res, next) => {
  console.log(req.path)
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/merchant', merchantRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, "../../accounts", 'build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "../../accounts", 'build', 'index.html'));
  });
}

module.exports = app
