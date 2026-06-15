import jwt from 'jsonwebtoken'

export default function authMiddleware(req,res,next){
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).send({message : "Token not sent"})
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(404).send({message:"Invalid Token"})
        }

        req.userId = decoded.id;
        next();
    })
}