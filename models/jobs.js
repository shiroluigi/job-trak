const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        position : {
            type: String,
            required:[true,'Company name is required']
        },
        company: {
            type: String,
            required:[true,'Company name is required']
        },
        status : {
            type: String,
            enum: ['current','open','closed','previous']
        },
        date: Date
    }
)

module.exports = mongoose.model('jobs',jobSchema)