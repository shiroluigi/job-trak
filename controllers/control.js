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
const createJob = async (req,res) => {
    const { position,company , status , date } = req.body
    if(!position || !company || !status  || !date)
    {
        res.status(500).json({msg: 'Incomplete info provided'})
    }
    try {
        const resp = await jobs.create({ forId: res.locals.decrypt.id , position , company , status , date})
        console.log(resp)
        console.log(req.body)
        res.status(200).json({ msg: "job creation hit" })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Something went wrong,try again '})
    }
}
const deletejobs = async  (req,res) => {
    const resp = await jobs.deleteMany()
    res.status(200).json(resp)
}
//GET
const getallusers = async (req, res) => {
    const users = await user.find();
    res.status(200).json({ msg: users })
    console.log(users)
}
const dashboardGet = async (req, res) => {
    res.status(200).json({ msg: res.locals.decrypt })
}
const getJob = async (req,res) => {
    const resp = await jobs.find({forId:res.locals.decrypt.id})
    res.status(200).json({resp})
}
const getalljobs = async (req,res) => {
    const resp = await jobs.find()
    res.status(200).json(resp)
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
    createJob,
    getalljobs,
    deletejobs,
    getJob
}