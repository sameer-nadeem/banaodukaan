const mongoose = require("mongoose")
const Schema = mongoose.Schema

const storeSchema = new Schema({

    storeId:{
        type: mongoose.Schema.Types.ObjectId
    },
    title:{
        type: String
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    settings:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setting'
    },
    discountCodes:[{
        type: String
    }],
    complaints:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Complaint'
    }],
    logo: {
        type: String
    },
    cover: {
        type: String
    }
})

module.exports = mongoose.model('Store', storeSchema );
