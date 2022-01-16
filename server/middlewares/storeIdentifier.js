const Store = require('../models/store.model')
const storeIdentifier = async (req, res, next) => {
  const storeName = req.vhost[0]
  const store = await Store.findOne({
    title: storeName
  }).select("_id")

  if (!store)
    return res.status(404).json({ error: "STORE_NOT_FOUND" })

  req.storeId = store._id
  next()
}

module.exports = storeIdentifier
