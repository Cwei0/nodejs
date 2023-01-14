const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,'./files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

//toString() => 'utf8'
console.log('Hello...')

//it is wise to append the text with the write function

fs.writeFile(path.join(__dirname,'./files', 'reply.txt'),'Nice to meet you.', (err) => {
    if (err) throw err
    console.log('Write Complete')

    fs.appendFile(path.join(__dirname, './files', 'reply.txt'), '\n\n Yes it is', (err) => {
        if (err) throw err
        console.log('Append Complete')

        fs.rename(path.join(__dirname, './files', 'reply.txt'), path.join(__dirname, './files', 'newReply.txt'), (err) => {
            if (err) throw err
            console.log('Renamed Complete')
        })
    })
})



//uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error ${err}`)
    process.exit(1)
})