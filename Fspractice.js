const fs= require('fs');
const path= require('path');

const address= path.join(__dirname,"file.txt");
fs.readFile(address ,'utf-8', (err,msg)=>{
    console.log(msg);
    console.log("this file is opened in reading mode")
})


console.log("lets write something after reading ")


fs.writeFile(address , "hey i have just writed the content in this file using the write method of fs Module",(msg)=>{
    console.log("\n yupp this code is writting the data in the file")

})

console.log("lets append something after reading and writting ")
fs.appendFile(address,"hey lets append something more in this file",()=>{
    console.log("just started appending something ");
    fs.readFile(address ,'utf-8', (err,msg)=>{
        console.log(msg);
        console.log("readingg inside append mode")
    })
})

fs.readFile(address ,'utf-8', (err,msg)=>{
    console.log(msg);
    console.log("readingg outside  append mode")
})


console.log("finally done all the three task reading writing and appending in the file  ")