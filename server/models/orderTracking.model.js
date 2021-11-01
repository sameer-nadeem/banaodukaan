const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderTrackingSchema = new Schema({
    orderTrackingId:{
        type: mongoose.Schema.Types.ObjectId
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    status:{
        type: String
    },
})

module.exports = mongoose.model('OrderTracking', orderTrackingSchema );
