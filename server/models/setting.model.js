const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingSchema = new Schema({
    settingId: {
        type: mongoose.Schema.Types.ObjectId
    },
    shippingDomesticRate: {
        type: Number
    },
    shippingWorldwideRate: {
        type: Number
    },
    localPickupAddress: {
        type: String
    },
    paymentProviders: [{
        type: String
    }],
    taxes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax'
    },
})

module.exports = mongoose.model('Setting', settingSchema);
