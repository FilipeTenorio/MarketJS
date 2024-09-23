const express = require('express');
const productRouter = express.Router();
const productControllers = require('../controllers/productControllers')
const app = express();

app.use(express.json());

productRouter.route('/api/produtos')
    .get((req, res) => {
        // Pegar todos produtos
        productControllers.getProdutos(req, res);
    })


productRouter.route('/api/produtos/:id')
    .put((req, res) => {
        // Atualizar um produto.
        productControllers.updateProduct(req, res);
    })
    .post((req, res) => {
        // Criar um novo produto.
        productControllers.createProduct(req, res);
        });

        //ID1 é o ID do funcionario, e o ID2, é o da compra que ele deseja deletar.
productRouter.route('/api/produtos/:id1/:id2')
        .delete((req, res) => {
        productControllers.deleteProductById(req, res);
        })

module.exports = productRouter;


