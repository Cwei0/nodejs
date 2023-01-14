console.log("Starting")

// console.log(global)
//  module importing with Common JS module and es6 module

// import os from 'os' 
const os = require('os');
const path = require('path') //Common Core module import
const {add, divide} = require('./math') //Custom module & destructuring

// console.log(divide(5,8))

// console.log(os.type())
// console.log(os.version())
// console.log(os.platform())
// console.log(os.arch())
// console.log(os.homedir())
// console.log(os.userInfo())
// console.log(os.networkInterfaces())
// console.log(os.machine())

// const currentOS = {
//     name: os.type(),
//     release: os.version(),
//     totalMem: os.totalmem()

// }
// console.log(currentOS)

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))
// console.log(path.parse(__filename))
// console.log(path.format(__filename))

