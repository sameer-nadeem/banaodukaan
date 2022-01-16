const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    storeId: {
        type: Schema.Types.ObjectId,
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    description: {
        type: String
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    deleteFlag: {
        type: Boolean,
        default: false

    },
    status: {
        type: String,
        enum: ["Active", "Draft"],
        default: "Active"
    },
    image: {
        type: String
    }
})


module.exports = mongoose.model('Product', ProductSchema);
