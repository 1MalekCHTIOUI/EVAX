const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },    
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    register_date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema)
module.exports = User