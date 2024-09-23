const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compraSchema = new Schema({
    produto: {
        nome: { type: String, required: true }, // Nome do produto associado à compra
        preco: { type: Number, required: true }, // Preço do produto associado à compra
    },
    cliente: {type: String, required:true},
    data: { type: Date, required: true }, // Data da compra
});

module.exports = mongoose.model("CompraModel", compraSchema);
