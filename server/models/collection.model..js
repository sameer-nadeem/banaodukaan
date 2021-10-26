const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    collectionId:{
        type: mongoose.Schema.Types.ObjectId
    },
    name:{
        type: String
    }
})

module.exports = mongoose.model('Collection', CollectionSchema );