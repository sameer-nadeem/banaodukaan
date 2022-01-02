const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
})

module.exports = mongoose.model('User', userSchema );
