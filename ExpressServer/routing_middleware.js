// practicing the concept of routing and middleware

const express=require('express');
const path= require('path');
const fs= require('fs');
const fsPromise= require('fs').promises;
const date= require('date-fns');
const {v4:uuid}= require('uuid');
const logItems=require('../EventsFile/logEvent.js');


const server=express();
const Port=process.env.PORT || 3500;

const logger=async (req,res,next)=>{
const data=`${new Date()} \t ${req.url} \t ${req.method} \t${req.headers.origin} \t ${uuid()}\n`;
await logItems(data,'/reqLog.txt');
console.log("transferring to other middleWare");
next();
}
server.use(logger);

// Routing : Routing refers to determining how an application responds to a client request for a specific endpoint (URI) and HTTP method (GET, POST, PUT, DELETE, etc.). Express provides a straightforward way to define routes using methods like .get(), .post(), .put() etc.

// multiple routing having muliple request handling them using next function 


// next() :  move the current execution to the next  closest routing mehtod or the middleware 

// there is no use of next function if the response is already sent it will only give error if use next after sending the response 

// EX:

/*
server.use((req,res,next)=>{
   console.log(" middleware 1 ");
   res.send("I have already resolved the request Using next() below just give you error");
   next(); // ERROR : Cannot set headers after they are sent to the client
}
)

*/

// chianing the route handlers 

 const first=(req,res,next) =>{
    console.log("the first");
    next();
 }
 const second= (req,res,next) =>{
    console.log("second");
   next();
 }
 const third= (req,res) =>{
    console.log("third");
    res.send(" this the result after route chaining");
 }

 server.get("/",[first,second,third]); // it will handle the requst on  this server by calling the first function and then using next() it will transfer it till third
   


 server.get('/indx.html',(req,res)=>{
   console.log(" it handles all the request no matter what is written after the (/)");
})

// listen the server 

server.listen(Port,()=>{
   console.log("port is started !");
})
// MIDDLEWARE :Middleware functions are functions that have access to the request (req), response (res), and the next middleware function in the application’s request-response cycle. Middleware can:

// Execute any code.
// Modify the request and response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

// Types of MiddleWare :

// Built IN middleWare:

server.use(express.static('../public'),(request,response)=>{
   response.sendFile(path.join(request.url));
}) // it is a built in middleWare which search on the given address if the searched file is present at that it is gone executed 
//  CUSTOM MiddleWare : creating our own middleWare;

// server.use((req,res,next)=>{
//    const data = `${new Date()}\t${req.url}\t ${req.origin}\t${req.method} \t ${uuid()}`;
//   fs.appendFile(path.join(__dirname,"log",'reqLog.txt'),data,()=>{
//    console.log("data is  appending in the file on each request ");
//   });
//   next();
// })


// server.use((req,res)=>{
//    req.shubham="billionaire";
//    console.log(req.header['ContentType']);
//    res.end();
// })


