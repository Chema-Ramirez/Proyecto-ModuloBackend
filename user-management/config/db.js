const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("SE HA INICIADO LA CONEXION A LA BASE DE DATOS DE MONGODB")
    } catch (error) {
        console.error("ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB:", error.message)
    }
}

module.exports = connectDB
