const userDB={
    user:require('../model/user.json'),
    setUser:function(data){
        this.user=data;
    }
}
const fsPromises=require('fs').promises;
const bcrypt= require('bcrypt');
const path=require('path');

 const LogOut= async (req,res)=>{

   const refreshToken= req.cookies.jwt;
   if(!refreshToken) return res.sendStatus(204) // ok there is no content available to delete
    
//     checking that the user with given refresh token exist or not 

const foundUser= userDB.user.find(person => person.RefreshToken=refreshToken);
if(!foundUser) {
    res.clearCookie('jwt',{httpOnly:true , maxAge: 60* 60* 24*1000})
    return res.sendStatus(204)// no user exist with this user name in the database so no content is available 
}

//  if the username exist and the cookies exist in the databse then we have to delete the refersh token so that user have to login again to get the refersh token back 

const otherUser= userDB.user.filter(person => person.RefreshToken!== refreshToken);
const currentUser= {...foundUser,RefreshToken :""}
await fsPromises.writeFile(path.join(__dirname,"..","model","user"),JSON.stringify(userDB.user));

//  now we have to clear the cookie 
res.clearCookie('jwt', {httpOnly:true , maxAge:60*60*24*1000}); // if we gave secure: true it will work on the secure domain having https protocol
return res.send("Successfully logged Out ") 
}

module.exports= {LogOut}
