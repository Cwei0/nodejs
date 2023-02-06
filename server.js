const express = require('express')
const app = express()
require('dotenv').config()

const path = require("path")
const { logEvents, logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler")

const cors = require('cors')
const corsConfig = require('./config/corsOption')
const credentials = require('./middleware/credentials')

const cookieparser = require('cookie-parser')
const verifyJwt = require('./middleware/verifyJWT')
const limiter = require('./middleware/limiter')

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 8500

//Connect to Mongo
mongoose.set('strictQuery', true)
connectDB()

//Custom Middleware
app.use(logger) 

//To handle credentials check before CORS requests and fetch cookies credentials
app.use(credentials)
// Cross-origin Resource Sharing
app.use(cors(corsConfig))

//Built-in Middlewares
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

//Middleware for Cookie
app.use(cookieparser())
app.use('/',limiter)
app.use('/',express.static(path.join(__dirname, '/public'))) //pushing css and img sheets

//Routers
app.use('/', require('./router/root'))
app.use('/register', require('./router/register'))
app.use('/auth', require('./router/auth'))
app.use('/refresh', require('./router/refresh'))
app.use('/logout', require('./router/logout'))

app.use(verifyJwt)
app.use('/users', require('./router/api/users'))
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
//Error Handler & listen
app.use(errorHandler)

//Listen for MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`)
    })
})

