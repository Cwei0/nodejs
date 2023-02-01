const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_TOKEN_SECRET, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            //Add the dbname  
        })
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectDB