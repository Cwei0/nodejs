const { logEvents } = require('./logEvent')

const errorHandler = (err,req, res, next) => {
    logEvents(`${err.name}:${err.message}`, 'errLog.txt')
    res.status(500).send(err.message)
    console.error(err.stack)
    next()
}
module.exports = errorHandler;
