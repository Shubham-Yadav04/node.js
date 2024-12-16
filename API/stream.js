const express= require('express');
const fs=require('fs');
const path=require('path');
const port= process.env.PORT || 3500;

// started 
const server=express();


server.use(express.static(path.join(__dirname, '../public')));


server.use(express.json());

server.use(express.urlencoded({extended:true}));
// accessing the routes for the request on users directory 


server.use('/users',require('./routes/users'));
server.listen(port,()=>{
    console.log(" server has started ......");
})