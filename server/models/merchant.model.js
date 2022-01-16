const mongoose = require("mongoose")
const Schema = mongoose.Schema

const merchantSchema = new Schema({
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
    myStores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }]
})

module.exports = mongoose.model('Merchant', merchantSchema);
