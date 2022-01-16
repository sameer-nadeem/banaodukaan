const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderTrackingSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    status: {
        type: String
    },
})

module.exports = mongoose.model('OrderTracking', orderTrackingSchema);
