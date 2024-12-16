//  path module is also an built-In module in NodeJs 

const path=require('path')
console.log(path.sep) // provide the seperator used in path address to seperate the directories and the subdirectories


//  if you want the address of the file present in the directories and subdirectories you can get it by using the path.join()  method it will take the directories, subdirectories, file name as an argument in the same order 


const filePath=path.join("directory",'subdirectory','subkibhisub directory','filename')// all this should be relative path present in the same directory as of file 

const base=path.basename("address")// provide the name of the base file or directory of given address


//  absolute path provides and absolute path based on the argument 

const absolute=path.resolve(__dirname/__filename, "directory",'subdirectory', 'sub ki sub directory','file name ') 

path.isAbsolute("file address ")// checks is the address is absolute or not 
// file extension name 

const extension=path.extname('file-address')


path.parse("file address ") // return a object consisting details about file path (root, dir, base, ext, name).
path.format('obj') // oppossite of parse it returns an address from the object 