'use strict';

const express = require ('express');
const api = express.Router();

const productCtrl = require('../controllers/product');

api.get('/product', productCtrl.getProducts);

api.get('/product/:id', productCtrl.getProduct);

api.post('/product',  productCtrl.saveProduct);

api.put('/product/:id', productCtrl.updateProduct);

api.delete('/product/:id', productCtrl.deleteProduct);

module.exports = api;
