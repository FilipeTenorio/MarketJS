const UserModel = require('../models/userModel') // Importe o modelo User
const ProductModel = require('../models/productModel')


module.exports = {
    // Recuperar todos os clientes
    getClientes: (req, res) => {
        UserModel.find({ type: 'cliente' }).then((result) => {
            res.status(200).json(result);
        })
            .catch(() => {
                res.status(500).json({ message: "Não foi possível recuperar os clientes." });
            });
    },

    
    getProdutosPreferidos: async (req, res) => {
        
        try {
            const user = await UserModel.findById({_id : req.params.id,})          
            const categorias = user.cliente.categoriasPreferidas;
            const produtos = await ProductModel.find({ categoria: {"$in" : categorias}})
            
            res.status(200).json(produtos)
            
        } catch (error) {
            res.status(404).json({ message: "Usuario não possui categorias preferidas"})
        }
        },



    // Deletar cliente por ID
    deleteClienteById: async (req, res) => {
        try {
            const user = await UserModel.findOneAndDelete({ _id: req.params.id, type: 'cliente' });
            res.status(200).send({ message: "Cliente removido com sucesso." });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o cliente." });
        }
    },

    // Atualizar cliente por CPF (ou outro campo único)
    updateCliente: async (req, res) => {
        try {
            await UserModel.findOneAndUpdate(
                { cpf: req.body.cpf, type: 'cliente' }, // Verifica o type e campo único
                req.body
            );
            res.status(200).send({ message: "Cliente atualizado no sistema." });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados do cliente." });
        }
    },
}


