// normal javascript code to handle the functioning of the routes 
const {v4:uuid}= require('uuid');
const date=require('date-fns');
const fsPromises = require('fs').promises;
const path = require('path');
const dataFilePath = path.join(__dirname, '../model/employee.json');
let data = [];

async function loadData() {
    try {
        const fileContent = await fsPromises.readFile(dataFilePath, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error loading employee data:', error);
        data = [];
    }
}
loadData();

function getAllUsers(req,res){
    // this  function will get the data from the employee.json file and send it as an response
    console.log("inside the get all user method");
    res.json(data);
};

async function createNewUser(req,res){
    const body=req.body;
    const newId = data.length > 0 ? parseInt(data[data.length - 1].id) + 1 : 1;
data.push({  id: newId ,...body});

try{
    await fsPromises.writeFile(path.join(__dirname,'../model/employee.json'),JSON.stringify(data));
    const fileData= `${new Date()} \t User id: ${newId} \t ${uuid()} \t has been created \n`;
    await fsPromises.appendFile(path.join(__dirname,'../model/NewUserRecord.txt'),fileData);
 }
 catch(err){
    return res.status(500).json({message: "some issue occured in the server "});
 }
 console.log(' new user created ');
   return res.json({status:"success" , id: data.length+1});
}

async function UpdateUserById(req,res){
    const id=parseInt(req.params.id);
    const user=data.find(user=> // this will return that element which satisfies this condition
        user.id===id
    )
    if(user){
        if(req.body.firstname){
            user.firstname=req.body.firstname;
        }
        if(req.body.lastname){
            user.lastname=req.body.lastname;
        }
        const updatedData=` ${ new Date()} \t ${id} changes has been done in this Id  \t ${uuid()}\n`;
        try{
        await fsPromises.appendFile(path.join(__dirname,'../model/UserUpdationRecord.txt'),
            updatedData);
            console.log("user updated ");  
    }
    catch(err){
       console.log("some issue in updating the data in update user txt file");
    }
    return res.json(user);
    }
    else{
        return res.status(400).json({message:"no user foud " , id:id});
    }

}

async function deleteUserById(req,res){
    const id=parseInt(req.params.id);
    const user=data.find(user=>// this will return that element which satisfies this condition
        user.id===id
    )
    if(!user){
        return res.status(400).json({"message": " No user having entered id is found "});

    }
    else{
        const newData=data.filter(user => user.id!==parseInt(req.params.id));
        try{
        await fsPromises.writeFile(path.join(__dirname,'../model/employee.json'),JSON.stringify(newData));
        await fsPromises.appendFile(path.join(__dirname,'../model/DeleteRecord.txt'),
            `${ new Date()} \t ${user.firstname} \t id :${id}  deleted \t${uuid()}\n`
    );
    console.log("deleted the user and updated delete file ");
    }
    catch(err){
        console.log("the delete userFile is not updated  ");
    }
    return res.status(200).json({"message": "user deleted successfully","id":id});
} 
    
}

function getUserById(req,res){
    const id=parseInt(req.params.id);
    const user=data.find(user=>// this will return that element which satisfies this condition
        user.id===id
    )
    if(user){
        return res.status(200).json(user);
    }
    else{
        return res.status(400).json({"message":"user does not exists" ,"id":id});
    }
}

module.exports={getAllUsers,createNewUser,UpdateUserById,deleteUserById,getUserById};