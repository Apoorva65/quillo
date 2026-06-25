import pool from '../db.js'
import express from 'express'

const route = express.Router();

route.get('/mine',async(req,res)=>{
    const {rows} = await pool.query(`SELECT * FROM posts WHERE user_id = $1`,[req.userId]) 
    res.json(rows); 
})

route.post('/',async(req,res)=>{
    const {title,image,content} = req.body;
    const {rows} = await pool.query(`INSERT INTO posts (title,image,content,user_id) VALUES ($1,$2,$3,$4) RETURNING id`,[title,image||null,content,req.userId])

    res.json({id:rows[0].id,title,image,content})
});

route.put('/:id',async(req,res)=>{
    const {title,image,content} = req.body;
    const {id} = req.params
    const {rowCount} = await pool.query('UPDATE posts SET title = $1, image = $2, content = $3 WHERE id = $4 AND user_id = $5',[title,image,content,id,req.userId])

    if (rowCount === 0) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.json({id,title,image,content})
});

route.delete('/:id',async(req,res)=>{
    const {id} = req.params
    const {rowCount} = await pool.query(`DELETE FROM posts WHERE id = $1 AND user_id = $2`,[id,req.userId])

    if (rowCount === 0) {
    return res.status(404).json({
        message: "Post not found"
    });
    }

    res.json({message : "post deleted"})
});

export default route;