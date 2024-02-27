const express = require('express')
require('dotenv').config();
const {dbConection} = require('./database/config');
const cors = require('cors');
const app = express();

//Dbase 
dbConection();

// cors
app.use(cors())

//directorio public
app.use(express.static('public'))

// lectura y parseo

app.use(express.json());

//RUTAS
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

app.get('*',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})


app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})