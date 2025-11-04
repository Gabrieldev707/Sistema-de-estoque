const Fornecedor = require('../models/fornecedorModel');

// Rota GET 
exports.getAllFornecedores = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find();
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rota POST 
exports.createFornecedor = async (req, res) => {
  const fornecedor = new Fornecedor({
    nome: req.body.nome
  });
  try {
    const novoFornecedor = await fornecedor.save();
    res.status(201).json(novoFornecedor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};