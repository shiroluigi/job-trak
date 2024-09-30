const { sha256 } = require('js-sha256')
const pbkdf2 = require('pbkdf2')
const user = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//POST
const loginUser = async (req,res) => {
    res.status(200).json({msg: 'login user'})
}   
const registerUser = async (req,res) => {
    console.log(req.body)
    let cpy = req.body
    const { password } = req.body
    const scram = pbkdf2.pbkdf2Sync(password,process.env.SALT,1,32,'sha512').toString('base64')
    cpy.password = scram
    const resp = await user.create(req.body)
    console.log(resp)
    res.status(200).json({msg: 'success'})
}  
const removeAll = async (req,res) => {
    const resp = await user.deleteMany()
    res.status(200).json({ resp })
} 
//GET
const getallusers = async (req,res) => {
    const users = await user.find();
    res.status(200).json({msg: users})
    console.log(users)
}
module.exports = {
    loginUser,
    registerUser,
    getallusers,
    removeAll
}