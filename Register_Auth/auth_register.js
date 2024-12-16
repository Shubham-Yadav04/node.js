const express=require('express');
const path=require('path');
const server=express();
const Port= 3500 || process.env.Port;
server.use(express.json());

server.use(express.urlencoded({extended:true}));
// accessing the routes for the request on users directory 

server.use('/register',require("./routes/registerRoute"));
server.use('/login',require("./routes/loginRoute"));


server.listen(Port,()=>{
    console.log("server is started ...");
})