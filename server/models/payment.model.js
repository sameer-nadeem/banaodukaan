const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    typeOfPayment: {
        type: String
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
})

module.exports = mongoose.model('Payment', paymentSchema);
