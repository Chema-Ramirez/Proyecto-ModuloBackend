const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("SE HA INICIADO LA CONEXION A LA BASE DE DATOS DE MONGODB")
    } catch (error) {
        console.error("ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB:", error.message)
        process.exit(1)
    }
}

module.exports = connectDB
