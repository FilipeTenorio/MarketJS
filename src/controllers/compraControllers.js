const CompraModel = require('../models/compraModel');
const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel');


module.exports = {
    realizarCompra: async (req, res) => {
        try {
            // Coleta os detalhes da compra do corpo da requisição
            const { clienteId, produtoId, data } = req.body;

            // Encontra o cliente com base no ID
            let user = await userModel.findById(clienteId);

            if (!user) {
                return res.status(404).json({ message: "Cliente não encontrado." });
            }

            // Encontra o produto com base no ID
            const produto = await ProductModel.findById(produtoId);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }

            if(!user.cliente){
                user.cliente = {
                    categoriasPreferidas: []
                }
            }
            
            user.cliente.categoriasPreferidas.push(produto.categoria);           


            await CompraModel.create({
                produto: {
                    nome: produto.nome,
                    preco: produto.preco
                },
                
                cliente: clienteId,
                data: data
                
            });


            await user.save();

            res.status(200).json({ message: "Compra realizada com sucesso." });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível realizar a compra." });
        }
    }
};
