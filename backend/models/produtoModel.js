const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true // Garante que o código do produto seja único
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
  //
  // AQUI ESTÁ O RELACIONAMENTO:
  //
  fornecedor: {
    // 1. O tipo é um "ID de Objeto" do MongoDB
    type: mongoose.Schema.Types.ObjectId,
    // 2. 'ref' diz ao Mongoose qual outro Model este ID referencia
    ref: 'Fornecedor',
    required: true // Um produto DEVE ter um fornecedor
  }
});

module.exports = mongoose.model('Produto', produtoSchema);