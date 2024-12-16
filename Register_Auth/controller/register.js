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

async function handleNewUser(req, res){
    const {userName,pswd}=req.body;
    if(!userName  || !pswd){
        return res.status(400).json({'message':"username and password are required"});
    }

    //  now here we got both the username and password field from the user now check the username is unique or not 

    const userExist=userDB.user.find(person=>person.userName===userName);
    if(userExist){
        return res.status(409).send("userName already exixts");
    }
    //  now no duplicate user exists so we have to register the user 

    try{
        const newPswd=await bcrypt.hash(pswd,12);
        userDB.setUser([...userDB.user,{"userName":userName,"pswd":newPswd}]);
     
        await fsPromises.writeFile(path.join(__dirname,"..","model","user.json"),JSON.stringify(userDB.user));
        console.log(userDB.user);
        return res.status(200).json({'message':"user registerd successfully"});

    }
    catch(err){
        return res.status(500).send(err.message);
    }

}
module.exports={handleNewUser};