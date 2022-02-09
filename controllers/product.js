


const mysql = require('mysql');

const connection = mysql.createConnection({
    hots: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

connection.connect(error =>{
    if (error) throw error;
    console.log('Conexión establecida con Base de Datos!!');
});



function getProduct(req, res){
   
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
}

function getProducts(req, res){

    const sql = 'SELECT * FROM product' ;

    connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0){
        res.json(result);
    }else{
        res.status(404).send('Sin Resultados!!!');
    }
    });
}

function saveProduct(req, res) {
    
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
}

function updateProduct(req, res) {
   
    const {id} = req.params;

    const {name, type, descrip, estado} = req.body;

    const sql = `UPDATE product SET name = '${name}' , type = '${type}' , descrip = '${descrip}', estado = '${estado}' WHERE id = ${id}`;

    connection.query(sql,  error => {
        if (error) throw error; 
        res.send('Producto Actualizado !');
    });
}

function deleteProduct (req, res) {
   
    const {id} = req.params;

    const sql = `DELETE FROM product Where id = ${id}`;

    connection.query(sql,  error => {
        if (error) throw error; 
        res.status(200).send('Producto Eliminado !');
    });
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}