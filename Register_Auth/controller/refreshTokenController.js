const userDB={
    user:require('../model/user.json'),
    setUser:function(data){
        this.user=data;
    }
}

require('dotenv').config()
const bcrypt= require('bcrypt');
const { writeFile } = require('fs');
const path=require('path');
const jwt= require('jsonwebtoken')

const refershTokenController= (req,res)=>{

    //  if the there is no token present in the cookie it means the cookie is either expired or never authorized make the user login again 

    if(!req.cookies?.jwt) return res.sendStatus(401) // unauthorized
    // check the user refreshToken
    const refreshToken=req.cookies.jwt;
    const foundUser=userDB.user.find(person=> person.RefreshToken===refreshToken);
//     console.log(foundUser)
// console.log(req.cookies.jwt)
    if(!foundUser) return res.sendStatus(403); // forbidden

    //  got the user with the RefreshToken present in the request cookie

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
           
       console.log(decoded)
            if(err || foundUser.userName!==decoded.userName) return res.sendStatus(403) // forbidden if after the decoding of the refresh token the username used to create the refresh token does not matches with the user founded above 
            const accessToken=jwt.sign({"username":decoded.userName},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'});
            
            return res.json({accessToken});
        })
}   

module.exports={refershTokenController}