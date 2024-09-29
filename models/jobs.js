const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required:[true,'Company name is required']
        }
    }
)

module.exports = mongoose.model('jobs',jobSchema)