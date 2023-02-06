const rateLimit = require('express-rate-limit')

const limiter = new rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Rate limit exceeded, try again in an hour.'
})

module.exports = limiter