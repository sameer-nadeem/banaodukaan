const Merchant = require('../models/merchant.model')
const mongoose = require('mongoose')
const authStore = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.user.id)
    const storeId = req.storeId
    console.log("stores", merchant.myStores, mongoose.Types.ObjectId(storeId))

    if (!merchant.myStores.includes(mongoose.Types.ObjectId(storeId))) {
      return res.status(401).json({ error: "UNAUTHORISED_FOR_THIS_STORE" })
    }

    return res.status(200).json({ merchant })

  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" })
  }
}

module.exports = {
  authStore
}
