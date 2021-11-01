const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taxSchema = new Schema({
    taxId:{
        type: mongoose.Schema.Types.ObjectId
    },
    taxRate:{
        type: Float32Array
    },
    amount:{
        type: Float32Array
    },
})

module.exports = mongoose.model('Tax', taxSchema );
