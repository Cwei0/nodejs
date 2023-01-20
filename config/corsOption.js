//CORS setup
const whitelist = [
    'https://www.bing.com/', 
    'https://www.google.com/', 
    'localhost:8500/'
]
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
module.exports = corsOptions