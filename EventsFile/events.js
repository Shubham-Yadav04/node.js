const event= require('events')
const { addListener } = require('process')

// this module is used to add event listener in program we can also handle the error using the eventlisteners


// the EventEmitter class is the core of events provie method to emit and register listner functions to respond events
class myEvent extends event.EventEmitter{}
// functions:

on("event",listner)
addListener("event",listner);// present in process module function same as on 

emit("event","value for the listner function if any ");
emitter.once(event, listener) // register a one time  listener for an specific event 
emitter.off(event, listener) // turns offs the event 
emitter.removeAllListeners([event]) // removes all the listners applied on the specified event 
emitter.listeners(event)// returns array of all listners applied on a specific event