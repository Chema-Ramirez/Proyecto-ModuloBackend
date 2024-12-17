const express = require('express')
const connectDB = require('./user-management/utils/db.js')
const cors = require('cors')

const server = express();

server.use(cors({ origin: 'http://127.0.0.1:3005' }))
server.use('/public', express.static('public'))

const port = 3005

connectDB()

    server.listen(port, ()=>{
        console.log(`El Servidor se inicio correctamente en el puerto: ${port}`)
    })






