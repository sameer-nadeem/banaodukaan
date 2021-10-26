const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    brandId:{
        type: mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String
    }
})

module.exports = mongoose.model('Brand', BrandSchema );