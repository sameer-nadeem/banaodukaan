const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    total: {
        type: Float32Array
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    discount: {
        type: Float32Array
    }
})


module.exports = mongoose.model('Order', OrderSchema);
