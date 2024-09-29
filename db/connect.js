const mongoose = require('mongoose')

const connection = (url) => {
    mongoose.connect(url)
}


module.exports = connection