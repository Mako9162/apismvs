'use strict';

const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    hots: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

app.get('/api/product', (req, res) => {
    res.send(200, {products: []});
});

app.get('/api/product/:id', (req, res) => {
    
});

app.post('/api/product', (req, res) => {
    
    console.log('POST /api/product');
    console.log(req.body);

    const sql = 'INSERT INTO product SET ?';

    const customerObj = {
        name: req.body.name,
        type: req.body.type,
        descrip: req.body.descrip,
        est: req.body.est
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error; 
        res.status(200).send('Producto Creado !');
    });
   
});

app.put('/api/product/:id', (req, res) => {

} );

app.delete('/api/product/:id', (req, res) => {

});

connection.connect(error =>{
    if (error) throw error;
    console.log('Conexión establecida con Base de Datos!!');
});

app.listen(port, () => {
    console.log(`Servidor en Linea en http://localhost:${port}`)
});