import db from '../db.js'
import express from 'express'

const route = express.Router();

route.get('/',(req,res)=>{
    const getposts = db.prepare(`SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id
  ORDER BY posts.created_at DESC`);
    const posts = getposts.all()
    res.json(posts)
});

route.get('/:id',(req,res)=>{
    const {id} = req.params
    const getone = db.prepare(`SELECT * FROM posts WHERE id = ?`)
    const post = getone.get(id);
    res.json(post)
});

export default route;