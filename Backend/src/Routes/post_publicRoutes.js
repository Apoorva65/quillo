import pool from '../db.js';
import db from '../db.js'
import express from 'express'

const route = express.Router();

route.get('/',async(req,res)=>{
    const getposts = await pool.query(`SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id
  ORDER BY posts.created_at DESC`);
    const posts = getposts.rows;
    res.json(posts)
});

route.get('/post/:id',async(req,res)=>{
    const {id} = req.params
    const getone = await pool.query(`SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1`,[id])
    const post = getone.rows[0];
    res.json(post)
});

export default route;