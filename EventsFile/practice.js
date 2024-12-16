const EventEmitter = require('events')


const date = require('date-fns')
const {v4:uuid}= require('uuid')
const fileps=require('fs').promises

class Events extends EventEmitter{}

const myEvent= new Events();
myEvent.on("hello",(data)=>{
    console.log(data)
    console.log(new Date() , uuid())

})

setTimeout(() => {
    myEvent.emit("hello","hey hello how are you ?")
    
}, 2000);



