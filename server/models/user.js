const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const db = require('../server')


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const  User = mongoose.model('User', userSchema )

module.exports=User