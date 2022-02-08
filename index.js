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
    const {id} = req.params;

    const sql = 'SELECT * FROM product' ;

    connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0){
        res.json(result);
    }else{
        res.status(404).send('Sin Resultados!!!');
    }
    });
});

app.get('/api/product/:id', (req, res) => {
    const {id} = req.params;

    const sql = `SELECT * FROM product WHERE id= ${id}` ;

    connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0){
        res.json(result);
    }else{
        res.status(404).send('Sin Resultados!!!');
    }
    });
});

app.post('/api/product', (req, res) => {
    
    console.log('POST /api/product');
    console.log(req.body);

    const sql = 'INSERT INTO product SET ?';

    const customerObj = {
        name: req.body.name,
        type: req.body.type,
        descrip: req.body.descrip,
        estado: req.body.estado
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error; 
        res.status(200).send('Producto Creado !');
    });
   
});

app.put('/api/product/:id', (req, res) => {
    
} );

app.delete('/api/product/:id', (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM product Where id = ${id}`;

    connection.query(sql,  error => {
        if (error) throw error; 
        res.status(200).send('Producto Eliminado !');
    });
});

connection.connect(error =>{
    if (error) throw error;
    console.log('Conexión establecida con Base de Datos!!');
});

app.listen(port, () => {
    console.log(`Servidor en Linea en http://localhost:${port}`)
});