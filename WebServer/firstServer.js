const path=require('path')
const fs=require('fs')
const fspromise= require('fs').promises
const date=require('date-fns');
const EventEmitter = require('events');
const http= require('http')

class Events extends EventEmitter{}

const events= new Events();
const Port=process.env.PORT || 3500;

const serve=async(filepath,Content_type,response)=>{
try{
    const data= await fspromise.readFile(filepath,'utf-8');
    response.writeHead(200,{'Content-type':Content_type});
    response.end(data);

}
catch(err){
    console.log(err);
    response.statusCode=500;
    response.end();
    
}
}
const server=http.createServer((req,res)=>{
    console.log("it is like promise which have req and response as an callback in it", req.url , req.method)

    let currentpath;
    const extension= path.extname(req.url);
    let Content_type;
    switch(extension){
        case '.css':
            Content_type='text/css';
            break;
        case '.json':
            Content_type='application/json';
            break;
        case '.js':
            Content_type= 'text/javascript';
            break;
        case '.jpg':
            Content_type='image/jpeg';
            break;
        case '.png':
            Content_type='image/png';
            break;
        case '.txt':
            Content_type='text/plain';
            break;
        default :
        Content_type='text/html';
    }

    let filepath=
                Content_type==='text/html' && req.url==='/'
                ?path.join(__dirname,'index.html')
                    :Content_type==="text/html" && req.url.slice(-1)==='/'
                    ?path.join(__dirname,"subdir","index.html")
                        :Content_type==='text/html'
                            ? path.join(__dirname,req.url)
                                :path.join(__dirname,req.url);
                        
if(!extension && req.url.slice(-1)!=='/'){
    filepath+='.html';
}
const fileExists=fs.existsSync(filepath);
if(fileExists){
   // success the given filepath exists in the system so we will serve the user with the specified file  
   serve(filepath,Content_type,res);
}        
else{
     // either 301 which refers to redirect error(the current file is modified or the content is redirected to different address)
     switch(path.parse(filepath).base){
        case 'file.html':
            res.writeHead(301,{'location': 'index.html'});
            res.end();
            break;
        default : // 404 error file not found 
        serve(path.join(__dirname,'404.html'),'text/html',res);
     }


    // either it causes 404 error which refers to file not found 
   
    
}

});

server.listen(Port,()=>{
    console.log("the port is opened in listening mode ")
})