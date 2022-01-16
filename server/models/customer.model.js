const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customerSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    myOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    address: {
        type: String
    }

})

module.exports = mongoose.model('Customer', customerSchema);
