import db from '../db.js'
import express from 'express'

const route = express.Router();

route.get('/',(req,res)=>{
    const getposts = db.prepare(`SELECT * FROM posts`);
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