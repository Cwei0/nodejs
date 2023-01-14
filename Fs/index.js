const fsPromise = require('fs').promises;
const path = require('path');

const fileOPs = async () => {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, './files', 'starter.txt'), 'utf8')
        await fsPromise.unlink(path.join(__dirname,'./files', 'starter.txt'))
        await fsPromise.writeFile(path.join(__dirname,'./files', 'promiseReply.txt'), 'Oreoluwa my nigga')
        await fsPromise.appendFile(path.join(__dirname,'./files', 'promiseReply.txt'), '\niyala iya anybody')
        await fsPromise.rename(path.join(__dirname,'./files', 'promiseReply.txt'), path.join(__dirname,'./files', 'Convo.txt'))
        const newData = await fsPromise.readFile(path.join(__dirname, './files', 'Convo.txt'), 'utf8')
        console.log(newData); 
    } catch (err) {
        console.error(err);
    }
}

fileOPs()

//toString() => 'utf8'
console.log('Hello...')

//it is wise to append the text with the write function

// fs.writeFile(path.join(__dirname,'./files', 'reply.txt'),'Nice to meet you.', (err) => {
//     if (err) throw err
//     console.log('Write Complete')

//     fs.appendFile(path.join(__dirname, './files', 'reply.txt'), '\n\n Yes it is', (err) => {
//         if (err) throw err
//         console.log('Append Complete')

//         fs.rename(path.join(__dirname, './files', 'reply.txt'), path.join(__dirname, './files', 'newReply.txt'), (err) => {
//             if (err) throw err
//             console.log('Renamed Complete')
//         })
//     })
// })



//uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error ${err}`)
    process.exit(1)
})