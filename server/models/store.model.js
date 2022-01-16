const mongoose = require("mongoose")
const Schema = mongoose.Schema

const storeSchema = new Schema({
    title: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    settings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting'
    },
    discountCodes: [{
        type: String
    }],
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    }]
})

module.exports = mongoose.model('Store', storeSchema);
