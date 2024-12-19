const {v4:uuid}= require('uuid');
const date=require('date-fns');
const path = require('path');
const fsPromises=require('fs').promises
const dataFilePath = path.join(__dirname, '../model/user.json');

let data = [];
async function loadData() {
    try {
        const fileContent = await fsPromises.readFile(dataFilePath, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error loading employee data:', error);
        data = [];
    }
} loadData();


function getAllUsers(req,res){
    // this  function will get the data from the employee.json file and send it as an response
    console.log("inside the get all user method");
    console.log("Data:", data);
    res.json(data);
};
module.exports={getAllUsers}