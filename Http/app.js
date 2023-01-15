const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Welcome to homepage')
    }
    if(req.url ==='/about'){
        res.end('Here is our history')
    }
    res.end(`<h1> PAGE NOT FOUND </h1> <a href="/"> Go back Home</a> `)
})

server.listen(4000)