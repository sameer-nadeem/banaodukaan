const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taxSchema = new Schema({
    taxId: {
        type: mongoose.Schema.Types.ObjectId
    },
    taxRate: {
        type: Number
    },
    amount: {
        type: Number
    },
})

module.exports = mongoose.model('Tax', taxSchema);
