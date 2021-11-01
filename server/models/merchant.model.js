const mongoose = require("mongoose")
const Schema = mongoose.Schema

const merchantSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    myStores:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }]
})

module.exports = mongoose.model('Merchant', merchantSchema );
