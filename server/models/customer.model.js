const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    myOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
    },
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
    address: {
        type: String
    },
    deleteFlag: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String
    },
    apartment: {
        type: String
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

})

module.exports = mongoose.model('Customer', customerSchema);
