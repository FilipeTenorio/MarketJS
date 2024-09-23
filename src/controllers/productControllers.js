const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel')


module.exports = {
    getProdutos: (req, res) => {
        ProductModel.find({}).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Ocorreu um erro !" })
        })
    },

    // Deletar produto pelo Codigo.
    deleteProductById: async (req, res) => {
        const user =  await UserModel.findById({ _id: req.params.id1});       
            
            if (user.type != "funcionario" ) {
                res.status(403).json({message: "Você não é um funcionario."})
                return;
            }
        
        try {
            await ProductModel.deleteOne({ _id: req.params.id2 });
            res.status(200).send({ message: "Produto deletado com sucesso!" })
        } catch (err) {
            res.status(500).json({ message: "Não foi possivel remover o produto" })
        }
    },



    // Criar o produto
    createProduct: async (req, res) => {
            const user =  await UserModel.findById({ _id: req.params.id});       
            
            if (user.type != "funcionario" ) {
                res.status(403).json({message: "Você não é um funcionario."})
                return;
            }

        try {
            const result = await ProductModel.create(req.body)
            res.status(201).json({ message: `O produto ${result._doc.nome} foi criado com sucesso!` })
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel criar o produto ${req.body.nome}` })
        }
    },

    // Atualizar o produto.
    updateProduct: async (req, res) => {
        //Atualiza os dados do produto selecionado.
        try {
            const result = await ProductModel.updateOne({ codigo: req.body.codigo }, req.body)
            res.status(200).send({ message: "Produto atualizado com sucesso!" })
        } catch (err) {
            res.status(500).json({ message: "Não foi possivel atualizar os dados deste produto." })
        }
    }

}