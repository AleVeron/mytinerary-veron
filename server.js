require('dotenv').config()   //Requiero libreria dot env
require('./config/database') //Llama la config de mongo

const express = require ('express')
const Router = require ('./routes/routes')
const app = express()
const cors = require('cors') 

//middlewares
app.use(cors()) 
app.use(express.json())
app.use('/api', Router)

const PORT = 4000

app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + app.get ('port'))
})