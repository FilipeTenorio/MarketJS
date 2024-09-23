const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    codigo: { type: Number, required: true, unique: true },
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    precoprom: { type: Number, required: true },
    categoria: { type: String, required: true },
    validade: { type: String, required: true },
    quantidade: { type: Number, required: true },

})

module.exports = mongoose.model("ProductModel", productSchema);