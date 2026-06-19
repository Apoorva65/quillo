import db from '../db.js'
import express from 'express'

const route = express.Router();

route.get('/mine',(req,res)=>{
    const getPosts = db.prepare(`SELECT * FROM posts WHERE user_id = ?`) 
    const myPosts = getPosts.all(req.userId); 
    res.json(myPosts); 
})

route.post('/',(req,res)=>{
    const {title,image,content} = req.body;
    const pushPost = db.prepare(`INSERT INTO posts (title,image,content,user_id) VALUES (?,?,?,?)`)
    const result = pushPost.run(title,image||null,content,req.userId);

    res.json({id:result.lastInsertRowid,title,image,content})
});

route.put('/:id',(req,res)=>{
    const {title,image,content} = req.body;
    const {id} = req.params
    const putPost = db.prepare('UPDATE posts SET title = ?, image = ?, content = ? WHERE id = ? AND user_id = ?')
    const result  = putPost.run(title,image,content,id,req.userId)

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.json({id,title,image,content})
});

route.delete('/:id',(req,res)=>{
    const {id} = req.params
    const deletePost = db.prepare(`DELETE FROM posts WHERE id = ? AND user_id = ?`)
    const result = deletePost.run(id,req.userId);

    if (result.changes === 0) {
    return res.status(404).json({
        message: "Post not found"
    });
    }

    res.json({message : "post deleted"})
});

export default route;