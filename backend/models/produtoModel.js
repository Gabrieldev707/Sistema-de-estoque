const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true,
    default: 0
  },
  preco: {
    type: Number,
    required: true
  },

  fornecedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fornecedor',
    required: true
  }
});

module.exports = mongoose.model('Produto', produtoSchema);