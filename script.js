const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const New = format(new Date(), 'yyyyMMdd\tHH:mm:ss')

console.log(New)
console.log(uuid())
