const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    name: {
        type: String

    },
    description: {
        type: String
    },
    deleteFlag: {
        type: Boolean,
        default: false
    },
    storeId: {
        type: Schema.Types.ObjectId
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Collection', CollectionSchema);
