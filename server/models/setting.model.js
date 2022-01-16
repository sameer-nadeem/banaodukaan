const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingSchema = new Schema({
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
    country: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    website: {
        type: String
    },
    phone: {
        type: String
    },

})

module.exports = mongoose.model('Setting', settingSchema);
