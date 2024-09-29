const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided']
    },
    password: {
        type: String,
        required: [true, 'Password must be provided']
    },
    email: {
        type:String,
        required: [true, 'Email must be provided']
    },
    date: {
        type: Date,
        default: Date.now
    },
})



module.exports = mongoose.model('user',usersSchema)