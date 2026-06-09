import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const route = express.Router();

route.post('/register',(req,res)=>{
    const {email,username,password} = req.body

    const hashPassword = bcrypt.hashSync(password,7);

    try {

        const setUser = db.prepare(`INSERT INTO users (email,username,password) VALUES (?,?,?)`)
        const result = setUser.run(email,username,hashPassword)

        // res.json({id:result.lastInsertRowid,email,username})

        const token = jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn : '24h'})

        res.json({token})

    } catch (error) {

        console.log(error);

        if(error.errcode===2067){
            res.json({message : "Email already exists"})
        }
        else{
            res.sendStatus(503)
        }
        
    }
})

route.post('/login',(req,res)=>{
    const {email,password} = req.body

    try {
        
        const getUser = db.prepare(`SELECT * FROM users WHERE email = ?`)
        const user = getUser.get(email);

        if(!user){
            return res.status(404).json({message:"No user found"})
        }

        const checkPass = bcrypt.compareSync(password,user.password);

        if(!checkPass){
            return res.status(401).json({message:"Incorrect Password"})
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'}) 

        res.json({token})

    } catch (error) {
        console.log(error);
        res.sendStatus(503)
    }
})

export default route;