//  i have to take the data from the user.json

const userDB={
    user:require('../model/user.json'),
    setUser:function(data){
        this.user=data;
    }
}

//  importing the required modules
require('dotenv').config()
const fsPromises=require('fs').promises;
const bcrypt= require('bcrypt');
const { writeFile } = require('fs');
const path=require('path');
const jwt= require('jsonwebtoken')
async function handleNewUser(req, res){
    const {userName,pswd}=req.body;
    if(!userName  || !pswd){
        return res.status(400).json({'message':"username and password are required"});
    }

    //  now here we got both the username and password field from the user now check the username is unique or not 

    const foundedUser=userDB.user.find(person=>person.userName===userName);
    if(foundedUser){
        return res.status(409).send("userName already exixts");
    }
    //  now no duplicate user exists so we have to register the user 

    try{
        const newPswd=await bcrypt.hash(pswd,12);
       
        // setting a jwt tokenn for the new created user to establish a stateful connection and communication 
    //   after encrypting the user password in a cryptographic way using by adding a salt in it using the bcrypt module now i will crete a jwt for the user by giving an accesToken which is just  going to last for a short period of time (5 se 10 min) and a referesh token which will last for a long period of time say (some days or hours)

    const accesToken= jwt.sign({
        //  declaring the payload 
        "userName":userName
    } , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'30s'
})
const refreshToken= jwt.sign({
    //  declaring the payload 
    "userName":userName
} , process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:'1d'
})
//  adding the created user in the file with there refresh token stored in the file
//  now adding the refresh token inside the founded user data or the user
userDB.setUser([...userDB.user,{"userName":userName,"pswd":newPswd,"RefreshToken":refreshToken}]);
        await fsPromises.writeFile(path.join(__dirname,"..","model","user.json"),JSON.stringify(userDB.user));
        //  setting the refreesh token in the cookies using the httpsOnlyy method so that no one can access it using the javascript
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
        console.log(userDB.user);
        return res.status(200).json({'message':"user registerd successfully", "AcessToken":accesToken});

    }
    catch(err){
        return res.status(500).send(err.message);
    }

}
module.exports={handleNewUser};