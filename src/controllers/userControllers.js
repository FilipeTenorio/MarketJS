const  UserModel  = require('../models/userModel');
const jwtService = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = {
    login: async (req, res) => {
        try {
            const { login, password } = req.body;


            if (!login || !password) {
                return res.status(400).json({ message: "Credenciais incompletas." });
            }

            const result = await UserModel.findOne({ login, password });

            if (!result) {
                return res.status(401).json({ message: "Usuário não autorizado." });
            }


            jwtService.sign({ login }, secret, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Erro ao gerar o token." });
                }


                res.set("Access-Token", token);
                res.status(200).json({ message: "Login bem-sucedido." });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    },



    createUser: async (req, res) => {
        try {
            const { login, password, nome, email, type } = req.body;

            // Verificação do tipo de usuario.
            if (type !== 'cliente' && type !== 'funcionario') {
                return res.status(400).json({ message: "Tipo de usuário inválido." });
            }

            // Verificando se a requisição está de acordo
            if (!login || !password || !nome || !email) {
                return res.status(400).json({ message: "Credenciais incompletas." });
            }

            // Verificando se o login ja existe.
            const existingUser = await UserModel.findOne({ login });
            if (existingUser) {
                return res.status(409).json({ message: "Login já em uso." });
            }

            // Crie um novo usuário com base no tipo
            await UserModel.create({ login, password, nome, email, type });


            res.status(201).json({ message: "Usuário criado com sucesso." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
};

