const express = require('express')
const app = express()

const path = require("path")
const { logEvents, logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler")

const cors = require('cors')
const corsConfig = require('./config/corsOption')

const PORT = process.env.PORT || 8500

//Custom Middleware
app.use(logger) 

// Cross-origin Resource Sharing
app.use(cors(corsConfig))

//Built-in Middlewares
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/',express.static(path.join(__dirname, '/public'))) //pushing css and img sheets

//Routers
app.use('/', require('./router/root'))
app.use('/employees', require('./router/api/employees'))
app.use('/register', require('./router/register'))

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
//Error Handler & listen
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})