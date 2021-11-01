const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customerSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    myOrders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    address:{
        type: String
    }

})

module.exports = mongoose.model('Customer', customerSchema );
