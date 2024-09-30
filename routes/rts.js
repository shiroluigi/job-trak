const express = require('express')
const router = express.Router()
const {
    loginUser,
    registerUser,
    getallusers,
    removeAll,
    dashboardGet
} = require('../controllers/control.js')


router.route('/users').get(getallusers).post(removeAll)
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/dashboard').get(dashboardGet)


module.exports = {router}