'use strict'
const express = require('express');
const funcionarioRouter = express.Router()
const funcionarioControllers = require('../controllers/funcionarioControllers')
const app = express();

app.use(express.json());






funcionarioRouter.route('/api/funcionario')
    .get((req, res) => {
        funcionarioControllers.getFuncionarios(req, res);
    });



funcionarioRouter.route('/api/funcionario/:id')

    .put((req, res) => {
        funcionarioControllers.updateFuncionario(req, res);
    })
    .delete((req, res) => {
        funcionarioControllers.deleteFuncionarioById(req, res);

    })
    .post((req, res) => {
        funcionarioControllers.inserirPromocao(req, res);
    });

funcionarioRouter.route('/api/:id/produtos')
    .put((req, res) => {
        funcionarioControllers.updateProducts(req, res);
    })
    .post((req, res) => {
        funcionarioControllers.removerPromocao(req, res);
    })






module.exports = funcionarioRouter;


// app.get/put/delete etc..