const express = require('express')
const app = express()

const path = require("path")
const { logEvents, logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler")

const cors = require('cors')
const PORT = process.env.PORT || 8500
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

app.use(express.static(path.join(__dirname, '/public'))) //pushing css and img sheets

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

//Route handlers
//Example 1
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello html page')
    next()
}, (req, res) => {
    res.send('Hello World!')
})
//Example 2
const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

const cb2 = function (req, res) {
    res.send('Hello from C!')
}
app.get('/example/c', [cb0, cb1, cb2])

//App.route() fn used to chain route handlers
// app.route('/book')
//     .get((req, res) => {
//         res.send('Get a random book')
//     })
//     .post((req, res) => {
//         res.send('Add a book')
//     })
//     .put((req, res) => {
//         res.send('Update the book')
//     })


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})