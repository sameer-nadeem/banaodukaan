const config = require('config')
const jwt = require('jsonwebtoken')

const merchantAuth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token')

    if (!token)
      return res.status(401).json({ error: "NO_AUTH_TOKEN" })

    const parsedToken = jwt.verify(token, config.get('token-secret'))

    if (!parsedToken)
      return res.status(401).json({ error: "INVALID_AUTH_TOKEN" })

    if (parsedToken.type !== 'Merchant')
      return res.status(401).json({ error: "INVALID_AUTH_TOKEN", msg: 'Only merchants allowed' })

    req.user = parsedToken

    next()

  } catch (err) {
    return res.status(401).json({ error: "INVALID_AUTH_TOKEN" })
  }
}

module.exports = {
  merchantAuth
}
