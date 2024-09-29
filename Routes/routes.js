const express = require('express')
const router = express.Router()
const {
    loginUser,
    registerUser,
    getallusers,
    removeAll
} = require('../Controllers/control.js')


router.route('/users').get(getallusers).post(removeAll)
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)


module.exports = {router}