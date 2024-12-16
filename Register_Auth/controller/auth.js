//  i have to take the data from the user.json

const userDB={
    user:require('../model/user.json'),
    setUser:function(data){
        this.user=data;
    }
}

//  importing the required modules

const fsPromises=require('fs').promises;
const bcrypt= require('bcrypt');
const { writeFile } = require('fs');
const path=require('path');

async function authChecker(req,res){
    const {userName,pswd}=req.body;
    if(!userName  || !pswd){
        return res.status(400).json({'message':"username and password are required"});
    }
//  if the field are not empty then it will check the userName existence in the file user.json
const userExist=userDB.user.find(person=>person.userName===userName);
    if(!userExist){
        return res.status(400).send("No such user exixts");
    }

    //  the user exits in the file then we will check the password with the encrypted password 
    const result= bcrypt.compare(pswd,userExist.Password);
    if(result){
        return res.status(200).json({'message':" You are login successfully"});
    }
    else{
        return res.status(401).json({'message':"unauthorized user "});
    }
}
module.exports={authChecker};