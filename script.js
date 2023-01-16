// console.log("Starting")

const logEvents = require('./logEvent')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter()

//add a listerner once so we dont loop for ever
myEmitter.on('log', (msg) => {
    logEvents(msg)
})

setTimeout(() => {
    myEmitter.emit('log', 'Log Event emitted!')
}, 6000)