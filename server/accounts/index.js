const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const merchantRouter = require("./routes/merchant.routes")

app.use('/api/auth', authRouter)
app.use('/api/merchant', merchantRouter)

app.use('/', express.static(path.join(__dirname, "../../accounts", 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "../../accounts", 'build', 'index.html'));
});

module.exports = app
