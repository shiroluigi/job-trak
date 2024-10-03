const express = require('express')
const apiRouter = express.Router()
const webRouter = express.Router()
const { authenticator } = require('../middleware/pageAuth.js')
const {
    loginUser,
    registerUser,
    getallusers,
    removeAll,
    dashboardGet,
    renderDashboard,
    createJob,
    getalljobs,
    deletejobs,
    getJob
} = require('../controllers/control.js')

webRouter.route('/').get((req,res) => {
    res.render('login')
})
webRouter.route('/dashboard').get(renderDashboard)
webRouter.route('/register').get((req,res) => {
    res.render('register')
})

apiRouter.route('/users').get(getallusers).post(removeAll) //DANGER
apiRouter.route('/login').post(loginUser)
apiRouter.route('/register').post(registerUser)
apiRouter.route('/dashboard').get(authenticator , dashboardGet)
apiRouter.route('/create').post(authenticator, createJob)
apiRouter.route('/getJobs').get(getalljobs).post(deletejobs)//DANGER
apiRouter.route('/getJob').get(authenticator, getJob)


module.exports = { apiRouter,webRouter }