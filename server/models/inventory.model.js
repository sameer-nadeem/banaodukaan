const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InventorySchema = new Schema({
    stock: {
        type: Number
    },
    address: {
        type: String
    },
    transferOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})


module.exports = mongoose.model('Inventory', InventorySchema);
