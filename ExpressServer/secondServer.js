const express=require('express');
const path= require('path');
const eventHandler= require('./errorHandling.js')
const server=express();
const fs= require('fs');

const Port=process.env.PORT || 3500;

server.use((res,req,next)=>{
    console.log("transfered from the middleware");
    next();
})

server.get('^/$|/index(.html)?"',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
    console.log("sended a file .....");
})

server.get('/404(.html)?',(req,res)=>{
    // res.send("<h1>got an error no worry error makes concept clear</h1>"); // send() method is used to send any data to the response not in a file form in a text based manner
    res.sendFile(path.join(__dirname,'404.html'));
    console.log("sended a file .....");
})


// wanted to redirect the current request to any new address location use redirect() method 
server.get('/old(.html)?',(req,res)=>{
    res.redirect(301,path.join(__dirname,'new.html')); // we have to provide the status code otherwise it will consider it as a byDefault (302) code 
    console.log("file is redirected to new location");
    
})
server.get('/new(.html)?',(req,res,next)=>{
  try{
    fs.readFile('read.txt');
  }
  catch(err){
    err.msg="there is some error occured in the server";
    next(err);
  }
    
})
// applying middleware to handle the server error 
server.use(eventHandler);
server.listen(Port,()=>{
    console.log("listening the port ...");
})

