const express = require('express')
const apiRouter = express.Router()
const webRouter = express.Router()
const {
    loginUser,
    registerUser,
    getallusers,
    removeAll,
    dashboardGet
} = require('../controllers/control.js')

webRouter.route('/').get((req,res) => {
    res.render('login')
})
webRouter.route('/dashboard').get((req,res) => {
    res.render('dash')
})

apiRouter.route('/users').get(getallusers).post(removeAll)
apiRouter.route('/login').post(loginUser)
apiRouter.route('/register').post(registerUser)
apiRouter.route('/dashboard').get(dashboardGet)



module.exports = { apiRouter,webRouter }