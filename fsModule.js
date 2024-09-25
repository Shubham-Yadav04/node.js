// File input/output module
const fs =require('fs')


//  file-name. readFile('file-address', encoding-type, promise (err, data )) // error(callback function) argument shows the error if occurrs and the data(callback function ) argument shows the data present in the file
fs.readFile( 'file.txt','utf-8', (err,data)=>{
    console.log(err);
    console.log(data);
})
console.log("did you listen that shubham has become a billionaire ") 
/* output did you listen that shubham has become a billionaire 
 null
 hey this the file.txt consisting content which I am going to read uisng the fs module of Nodejs


 readFile is an asynchrounus promise which gets execute in  the back and main thread keep execution of the other line going on .*/

//  To resolve this asynchronus behaviour of readFile we use: readFileSync('file-name/ file-address')

const hello=fs.readFileSync('file.txt')
console.log(hello)// it will give us a bufferr object consisting the data in form of ASCII vslues we need too convert it in toString (output: <Buffer 68 65 79 20 74 68 69 73 20 74 68 65 20 66 69 6c 65 2e 74 78 74 20 63 6f 6e 73 69 73 74 69 6e 67 20 63 6f 6e 74 65 6e 74 20 77 68 69 63 68 20 49 20 61 ... 45 more bytes>)

console.log(hello.toString())
console.log("did you listen that shubham has become a billionaire ")

// output : hey this the file.txt consisting content which I am going to read uisng the fs module of Nodejs
// did you listen that shubham has become a billionaire


// fs.writeFile("fileaddress",'data to be writted in the file',(callbaclk function/function)) // its act as a asynchronus function 

fs.writeFile('file.txt',"hey wanted to edit the content of the file",()=>{
    console.log("file is updated ")
})

console.log("do you no shubham had mopdified the file.txt ")


fs.writeFileSync('file.txt',"hey wanted to edit the content of the file")
console.log("updated the file.txt file ")
