const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("CONNECTION TO MONGODB DATABASE HAS BEEN STARTED")
    } catch (error) {
        console.error("ERROR CONNECTING TO MONGODB DATABASE:", error.message)
    }
}

module.exports = connectDB
