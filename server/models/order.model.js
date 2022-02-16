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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    discount: {
        type: Number
    }

})


module.exports = mongoose.model('Order', OrderSchema);
