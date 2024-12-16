//  creating and managing a server using Http Server module of node js

const e = require('express')
const http=require('http')


// The requestListener is a function that gets executed every time the server receives a request. It takes two arguments:
// request: an instance of http.IncomingMessage (contains request data).
// response: an instance of http.ServerResponse (used to send a response back to the client).
const server=http.createServer((req,res)=>{
// responding acc to the url 
if(req.url==='/'){
    res.end(" here is your home page read the lline as much time you want to read it nalle berozgar")
}
else if(req.url==='/about'){
    res.end("  here is the about section not as much interested but if you are nalla berozgar then keep reading it ")
}
else{
    res.end(`<h1>OOPS !!!!!</h1> <p> not able to laod the desired page sorry </p> <a href ='/' ></a> go to home page again`
    )
}



    // res.write("hey this is the server created by me using the nodeJs")
    // res.end('goodbye') // used to end the server  and to provide the last piece of chunk or message if needed
})

server.listen(8000)
