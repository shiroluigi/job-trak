const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        forId: {
            type: String,
            required: [true, 'forId must be provided']
        },
        position: {
            type: String,
            required: [true, 'Company name is required']
        },
        company: {
            type: String,
            required: [true, 'Company name is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['current', 'open', 'closed', 'previous']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        }
    }
)

module.exports = mongoose.model('jobs', jobSchema)