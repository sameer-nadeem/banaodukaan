const Store = require('../models/store.model')
const storeIdentifier = async (req, res, next) => {
  const storeName = req.vhost[0]
  const storeId = (await Store.findOne({
    title: storeName
  }).select("_id"))._id
  req.storeId = storeId
  next()
}

module.exports = storeIdentifier
