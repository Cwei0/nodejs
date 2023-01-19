const express = require('express')
const app = express()

const path = require("path")
const { logEvents, logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler")

const cors = require('cors')
const PORT = process.env.PORT || 3500
//Custom Middleware
app.use(logger)

//CORS setup
const whitelist = ['https://www.bing.com/', 'https://www.google.com/', 'localhost:8500/']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS rules'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))


//Built-in Middlewares
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/',express.static(path.join(__dirname, '/public')))
app.use('/subdir' ,express.static(path.join(__dirname, '/public'))) //pushing css and img sheets

//Routes
app.use('/', require('./router/root'))
app.use('/subdir', require('./router/subdir'))
app.use('/employees', require('./router/api/employees'))

app.all('/*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({error : "404 not found"})
    } else {
        res.type('txt').send("404 not found")
    }
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})