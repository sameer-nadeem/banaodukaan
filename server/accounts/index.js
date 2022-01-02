const express = require('express')
const app = express()


app.get("/", (req, res) => {
  return res.send("from accounts")
})



module.exports = app
