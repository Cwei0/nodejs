const {logEvent} = require('./logEvent')

const errorHandler = (err,req, res, next) => {
    logEvent(`${err.name}:${err.message}`, 'errLog.txt')
    res.status(500).send(err.message)
    console.error(err.stack)
    next()
}
module.export = errorHandler
