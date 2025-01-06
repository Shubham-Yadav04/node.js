const express=require('express');
const path=require('path');
const server=express();
const CookieParser= require('cookie-parser')
const Port= 3500 || process.env.Port;
server.use(express.json());

server.use(express.urlencoded({extended:true}));
//  using the middleware for the cookies parsing 
server.use(CookieParser());

// accessing the routes for the request on users directory 

server.use('/register',require("./routes/registerRoute"));
server.use('/login',require("./routes/loginRoute"));
server.use('/refresh',require('./routes/refreshRoute'));
server.use('/logout',require('./routes/logOutRoute'));
//  to  get user in the file 
server.use(require('./middleware/verifyJWT').verifyJWT);
server.use('/users',require('./routes/getUserRoute'));

server.listen(Port,()=>{
    console.log("server is started ...");
})