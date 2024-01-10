require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const manuDetails = require('../schemas/manufacturerSchema')
mongoose.connect('mongodb://127.0.0.1:27017/tyresdb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2')
const User = require('../schemas/dataSchema')
const authenticateToken = require('../authmiddleware')

const router = express.Router()
router.use(express.json())

router.post('/register',async(req,res)=>{
    const {username:usrnm,password:pwd} = req.body
    console.log(usrnm,pwd)
    const duplicate = await manuDetails.findOne({username:usrnm})
    if(duplicate){
        console.log('Username exists pick another name')
        return
    }
    else{
        try{
        const salt = await bcrypt.genSalt(10)
        const hPwd = await bcrypt.hash(pwd,salt)
        manuDetails.create({username:usrnm,password:hPwd})
        res.status(201)
        }
        catch(e){
            console.log(e)
        }
    }
})

router.post('/login',async(req,res)=>{
    const {username:usrnm,password:pwd} = req.body
    try{
        const user = await manuDetails.findOne({username:usrnm})
        if(user && await bcrypt.compare(pwd,user.password)){
            const accessToken = jwt.sign(user.username,process.env.ACCESS_TOKEN_SECRET);
            const data = await User.find({})
            const dataToBeSent =[]
            for(let i =0;i<data.length;i++){
                dataToBeSent.push({registrationNo:data[i].registrationNo,mobileNo:data[i].mobileNo,occurances:data[i].occurances.length})
            }
            console.log(dataToBeSent)
            

            res.json({accessToken:accessToken,dataSent:dataToBeSent})
        }
        else{
            res.json({invalid:true})
        }
    }
    catch(e){
        console.log(e.message)
    }
})
router.get('/detailed',authenticateToken, async (req,res)=>{
    const vehno = req.query.registrationNo;
    const user = await User.findOne({registrationNo:vehno});
    if(user!==null && user!=undefined){
        res.json({detailedReports:user.occurances});
        return
    }
    else{
        res.json({'notfound':true})
        return
    }
})

// function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403)
//         req.user = user

//     })
//     next()
// }
module.exports = router