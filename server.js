// console.log("Starting")
const http = require("http");

const fs = require("fs");

const fsPromises = require("fs").promises;

const path = require("path");

const logEvents = require('./logEvent')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter { }

//initialize object
const myEmitter = new MyEmitter()

myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))

const HOST = 'localhost'

const PORT = process.env.PORT || 4500

const serverFile = async (filePath, contentType, res) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        )
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        res.writeHead(
            filePath.includes('404.html') ? 404 : 200, { 'Content-Type': contentType }
        )
        res.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch (err) {
        console.error(err)
        myEmitter.emit('log', `${err.name}:${err.message}`, 'errLog.txt')
        res.statusCode = 500
        res.end()
    }


}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')


    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.jpg':
            contentType = 'image/jpeg'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.txt':
            contentType = 'text/plain'
            break
        default:
            contentType = 'text/html'
    }

    let filePath = contentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'views', 'index.html') : contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html') : contentType === 'text/html' ? path.join(__dirname, 'views', req.url) : path.join(__dirname, req.url)

    if (!extension && req.url.slice(-1) !== '/') filePath += 'html';

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
        serverFile(filePath, contentType, res)
    } else {
        //301
        //404
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' })
                res.end()
                break

            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' })
                res.end()
                break
            default:
                serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
})


server.listen(PORT, HOST, () => {
    console.log(`listening on ${PORT}`)
})