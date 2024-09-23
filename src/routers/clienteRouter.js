'use strict'
const express = require('express');
const clienteRouter = express.Router()
const clienteControllers = require('../controllers/clienteControllers')
const app = express();

app.use(express.json());

clienteRouter.route('/api/clientes')
    .get((req, res) => {
        clienteControllers.getClientes(req, res);
    })

clienteRouter.route('/api/:id/recomendados')
    .get((req, res) => {
        clienteControllers.getProdutosPreferidos(req, res);
    })


clienteRouter.route('/api/cliente/:id')

    .put((req, res) => {
        clienteControllers.updateCliente(req, res);
    })
    .delete((req, res) => {
        clienteControllers.deleteClienteById(req, res);

    });



module.exports = clienteRouter;
