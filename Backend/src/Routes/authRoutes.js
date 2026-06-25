import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const route = express.Router();

route.post('/register',async(req,res)=>{
    const {email,username,password} = req.body

    const hashPassword = await bcrypt.hash(password,7);

    try {

        const result = await pool.query(`INSERT INTO users (email,username,password) VALUES ($1,$2,$3) RETURNING id`,[email,username,hashPassword])

        const token = jwt.sign({id:result.rows[0].id},process.env.JWT_SECRET,{expiresIn : '24h'})

        res.json({token})

    } catch (error) {

        console.log(error);

        if(error.code==='23505'){
            return res.status(409).json({message : "Email already exists"})
        }
        else{
            return res.status(503).json({
                message: "Server Error"
            });
        }
        
    }
})

route.post('/login',async(req,res)=>{
    const {email,password} = req.body

    try {
        
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
        const user = result.rows[0];

        if(!user){
            return res.status(404).json({message:"No user found"})
        }

        const checkPass = await bcrypt.compare(password,user.password);

        if(!checkPass){
            return res.status(401).json({message:"Incorrect Password"})
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'}) 

        res.json({token})

    } catch (error) {
        return res.status(503).json({
                message: "Server Error"
            });
    }
})

export default route;