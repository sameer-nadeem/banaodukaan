const mongoose = require("mongoose")
const Schema = mongoose.Schema

const complaintSchema = new Schema({
    complaintId:{
        type: mongoose.Schema.Types.ObjectId
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    merchantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    complaint:{
        type: String
    }
})

module.exports = mongoose.model('Complaint', complaintSchema );
