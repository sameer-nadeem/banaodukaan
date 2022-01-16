const mongoose = require("mongoose")
const Schema = mongoose.Schema

const complaintSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    complaint: {
        type: String
    }
})

module.exports = mongoose.model('Complaint', complaintSchema);
