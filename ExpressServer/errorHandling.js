
const date= require('date-fns');
const {v4:uuid}= require('uuid');
const logItems=require('../EventsFile/logEvent.js');

const eventHandler=(err,req,res,next)=>{
    logItems(`${err.name} : ${err.msg} \t ${uuid()} \t ${new Date()}\n`,"errorLog.txt");
console.log(err.stack);
res.status(500).send(" some error occured in the server");


}

module.exports=eventHandler;
