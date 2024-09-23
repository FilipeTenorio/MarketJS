const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['cliente', 'funcionario'] },
    cliente: {
        categoriasPreferidas: {type: [String]}
    }
})


module.exports = mongoose.model("UserModel", userSchema);
