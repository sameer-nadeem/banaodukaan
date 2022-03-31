const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId
    },
    total: {
        type: Number
    },
    products: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: {
            type : Number
        }
    }],
    discount: {
        type: Number
    },
    fullName:{
        type : String
    },
    address:{
        type : String
    },
    email:{
        type : String
    },
    city:{
        type : String
    },
    phone:{
        type : String
    },
    postalCode:{
        type : String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



})


module.exports = mongoose.model('Order', OrderSchema);
