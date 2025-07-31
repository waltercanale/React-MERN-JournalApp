/*
Rutas de Usuarios/auth
host + /api/auth
*/

const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//Crear servidor de express
const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Lectur y parseo body, la speticiones que vngan en formato json las voy a procesar ahi y extraer su contenido ahi
app.use( express.json())

//Directorio publico
app.use(express.static('public'))

//RUTAS
//TODO: auth // crear, login. renew
app.use('/api/auth', require('./routes/auth')) // esto significa que todo lo que este archivo vaya a exportar require('./routes/auth') lo va habilitar en esta ruta '/api/auth'

//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'))

//Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Corriendo en el puerto ${ process.env.PORT }`)
})