const { sha256 } = require('js-sha256')
const pbkdf2 = require('pbkdf2')
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const jobs = require('../models/jobs')
require('dotenv').config()
/* 
#######################################################
########## This is for all the api calls ##############
#######################################################
*/
//POST
const loginUser = async (req, res) => {
    let { name, password } = req.body
    password = pbkdf2.pbkdf2Sync(password, process.env.SALT, 1, 32, 'sha512').toString('base64')
    const findUser = await user.findOne({ name, password })
    if (!findUser) {
        res.status(401).json({ msg: 'no match' })
        return
    }
    let token = {
        name,
        password,
        id: findUser.id
    }
    if (findUser) {
        token = jwt.sign(token, process.env.JWT_SECRET)
    }
    res.status(200).json({ token })
}
const registerUser = async (req, res) => {
    console.log(req.body)
    let { name, password, email } = req.body
    const findUser = await user.findOne({ name })
    // console.log("->",findUser)
    if (!findUser) {
        password = pbkdf2.pbkdf2Sync(password, process.env.SALT, 1, 32, 'sha512').toString('base64')
        const resp = await user.create({ name, password, email })
        // console.log(resp)
        res.status(200).json({ msg: 'success' })
        return
    }
    res.status(500).json({ msg: 'user already exists' })
}
const removeAll = async (req, res) => {
    const resp = await user.deleteMany()
    res.status(200).json({ resp })
}
//GET
const getallusers = async (req, res) => {
    const users = await user.find();
    res.status(200).json({ msg: users })
    console.log(users)
}
const dashboardGet = async (req, res) => {
    console.log(req.headers.authentication)
    const [_, data] = req.headers.authentication.split(' ')
    console.log(data)
    const decrypt = jwt.verify(data, process.env.JWT_SECRET, (err, d) => {
        console.log("->", d)
        return d
    })
    res.status(200).json({ msg: decrypt })
}
const createJob = async (req,res) => {
    const resp = await jobs.create(req.body)
    console.log(resp)
    console.log(req.body)
    res.status(200).json({ msg: "job creation hit" })
}
/* 
#######################################################
########## This is for all the web calls ##############
#######################################################
*/
const renderDashboard = (req, res) => {
    res.render('dash')
}
module.exports = {
    loginUser,
    registerUser,
    getallusers,
    removeAll,
    dashboardGet,
    renderDashboard,
    createJob
}