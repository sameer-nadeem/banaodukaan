const Store = require('../models/store.model')
const storeIdentifier = async (req, res, next) => {
  const storeName = req.vhost[0]
  const store = await Store.findOne({
    title: storeName
  }).select("_id")

  if (!store)
    return res.status(404).json({ error: "STORE_NOT_FOUND" })

  req.storeId = '6245b17cd93d405f7e30e5f5'
  next()
}

module.exports = storeIdentifier
