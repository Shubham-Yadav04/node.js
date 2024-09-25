//  operating System module present in nodeJS it is one of the In-Built Modules
const os=require('os')// incase of built-in modules just write the name if the module in require 

const user=os.userInfo() // access the user info
console.log(user)// print an object containing all the information regarding the user 

//  to find the system uptime (time in seconds that the sysyem is runnig since last reboot )

console.log(`the Uptime for the system is : ${os.uptime()}`)

// other info about the Operating System 

const info={
    name:os.type(),
    release:os.release(),
    totalMEM:os.totalmem(),
    freeMem:os.freemem(),
    homedir:os.homedir(),
    hostname:os.hostname(),
    platform:os.platform(),
    network:os.networkInterfaces(), //network interfaces deatails IP address and all
    constants:os.constants, // constants of operating system for signals,errors and priorities
    cpus:os.cpus(), // info about each cpu core 
    cpuArch:os.arch()
}
console.log(info)


