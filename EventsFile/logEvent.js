const path= require('path');
const fs= require('fs');
const fsPromise= require('fs').promises;

const logItems=async(logData,logFile)=>{
    try{
        if(!fs.existsSync(path.join(__dirname,'../log'))){
            await fsPromise.mkdir(path.join(__dirname,'../log'));
        }
            await fsPromise.appendFile(path.join(__dirname,'../log',logFile),logData);
    }
catch(err){
    console.log(err);
}
}

module.exports=logItems;