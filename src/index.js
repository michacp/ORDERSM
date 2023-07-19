const express = require( 'express')
const morgan = require('morgan')
const path = require('node:path');
const{urlencoded,json}=require('express');
const cors = require('cors');
const initDB=require('./config/db')

const app = express()
app.use(cors());
app.use(morgan('dev'));

app.use(urlencoded({extended:true}));
app.use(json());
/**
 * Rutas
 **/
app.use(require('./routes'))
app.use(require('./routes/customers'))
app.use(require('./routes/logs'))

/**
 * RUTAS PUBLICAS 
 **/
app.use(express.static(path.join(__dirname,'public')))
/**
 * EJECUTAR SERVIDOR
 **/
 app.listen(4002,()=>{
     console.log('server up in http://localhost:4002');
     
});
 
initDB()

