const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema);