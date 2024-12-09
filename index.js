const express = require("express");
require("dotenv").config();
const cors = require('cors')
const { dbConnection } = require("./database/config");

console.log(process.env)

//crear servidor express
const app = express()

//Base de Datos
dbConnection();

// CORS
app.use(cors())

//public
app.use(express.static('public'))

// Lectura y parse del body
app.use(express.json())

//rutas
app.use('/api/auth', require('./routes/auth'));


 app.use('/api/events', require('./routes/events'));



//escuchar petición

app.listen(process.env.PORT,  ()=>{
    console.log(`corriendo en el puerto ${process.env.PORT}`)
})