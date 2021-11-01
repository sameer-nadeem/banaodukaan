const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema({

    paymentId:{
        type: mongoose.Schema.Types.ObjectId
    },
    typeOfPayment:{
        type: String
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
})

module.exports = mongoose.model('Payment', paymentSchema );
