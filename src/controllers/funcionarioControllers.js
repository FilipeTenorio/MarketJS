const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');

module.exports = {
    getFuncionarios: (req, res) => {
        UserModel.find({ "type": 'funcionario' })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(() => {
                res.status(500).json({ message: "Não foi possível recuperar os funcionários." });
            });
    },

    // Deletar funcionário por ID
    deleteFuncionarioById: async (req, res) => {
        try {
            await UserModel.findByIdAndDelete({ _id: req.params.id, type: 'funcionario' });
            res.status(200).send({ message: "Funcionário removido com sucesso." });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o funcionário." });
        }
    },

    // Atualizar funcionário por CPF (ou outro campo único)
    updateFuncionario: async (req, res) => {
        try {
            // Certificação de que o tipo do usuário seja 'funcionario'
            const filter = { _id: req.params.id, type: 'funcionario' };

            await UserModel.findOneAndUpdate(filter, req.body);
            res.status(200).send({ message: "Funcionário atualizado no sistema." });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados do funcionário." });
        }
    },

    // Atualizar produtos
    updateProducts: async (req, res) => {
            const user = await UserModel.findById({ _id: req.params.id});       
            
            if (user.type != "funcionario" ) {
                res.status(403).json({message: "Você não possui permissão."})
                return;
            }

        try {
            const result = await ProductModel.updateMany({ categoria: req.body.categoria }, req.body);
            res.status(200).send({ message: "Produto atualizado com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados deste produto." });
        }
    },

    // Inserir promoção em produtos
    inserirPromocao: async (req, res) => {
        try {
            
            const user = UserModel.findById({ _id: req.params.id});       
            
            if (user.type != "funcionario" ) {
                res.status(403).json({message: "Você não possui permissão."})
                return;
            }
            if (!req.body.categoria || !req.body.precoprom) {
                res.status(400).json({ message: "Categoria e valor da promoção são obrigatórios." });
                return;
            }
            ProductModel.updateMany({ categoria: req.body.categoria }, { precoprom: req.body.precoprom });
            res.status(200).send({ message: "Promoção atualizada com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados deste produto." });
        }
    },

    // Remover promoção de produtos
    removerPromocao: async (req, res) => {
        try {
            const user = UserModel.findById({ _id: req.params.id});       
            
            if (user.type != "funcionario" ) {
                res.status(403).json({message: "Você não possui permissão."})
                return;
            }
            if (!req.body.categoria) {
                res.status(400).json({ message: "Necessário uma categoria para alterar os valores." });
                return;
            }
            ProductModel.updateMany({ categoria: req.body.categoria }, { $set: { precoprom: 0 } });
            res.status(200).json({ message: "Promoção retirada com sucesso." });
        } catch (err) {
            res.status(500).json({ message: "Promoção não houve alteração, ocorreu algum erro." });
        }
    }
};
