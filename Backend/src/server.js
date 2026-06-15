import express from 'express'
import authRoutes from './Routes/authRoutes.js'
import post_publicRoutes from './Routes/post_publicRoutes.js'
import authMiddleware from './Middlewares/authMiddleware.js'
import post_protectedRoutes from './Routes/post_protectedRoutes.js'

const app = express();
const port = process.env.PORT || 3001

app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/posts',post_publicRoutes)
app.use('/api/posts',authMiddleware,post_protectedRoutes)

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
    
})