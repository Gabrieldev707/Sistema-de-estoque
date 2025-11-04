const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true // Garante que não haja dois fornecedores com o mesmo nome
  }
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema);