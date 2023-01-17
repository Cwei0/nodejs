const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem, logName)
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, 'logs'), (err) => {
                if (err) throw err;
                console.log('Directory Created')
            })
        }
        //testing
        await fsPromise.appendFile(path.join(__dirname, 'logs', logName), logItem)
    } catch (err) {
        console.error(err)
    }
}

module.exports = logEvents
