const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingSchema = new Schema({
    settingId:{
        type: mongoose.Schema.Types.ObjectId
    },
    shippingDomesticRate:{
        type: Float32Array
    },
    shippingWorldwideRate: {
        type: Float32Array
    },
    localPickupAddress:{
        type: String
    },
    paymentProviders:[{
        type: String
    }],
    taxes:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tax'
    },
})

module.exports = mongoose.model('Setting', settingSchema );
