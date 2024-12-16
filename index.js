console.log("hello world");
console.log("chal gya aakhir kar");
const {hello:fun,importedObject}= require("./second");
fun();
console.log("here is the imported object from the second.js  :", importedObject);