const express = require('express');
const compraRouter = express.Router();
const compraControllers = require('../controllers/compraControllers');
const app = express();

app.use(express.json());

compraRouter.route('/api/compras')
    .post((req, res) => {
        compraControllers.realizarCompra(req, res);
    })

module.exports = compraRouter;