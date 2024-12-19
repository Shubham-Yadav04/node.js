require('dotenv').config()
const jwt= require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    console.log("verifying..");
    if(!authHeader){
return res.sendStatus(401);
    }
    const token=authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        req.user=decoded.userName;
        next()
    })
}

module.exports= {verifyJWT};