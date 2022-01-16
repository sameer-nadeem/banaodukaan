const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taxSchema = new Schema({
    taxRate: {
        type: Number
    },
    amount: {
        type: Number
    },
})

module.exports = mongoose.model('Tax', taxSchema);
