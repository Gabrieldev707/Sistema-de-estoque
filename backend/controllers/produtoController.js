const Produto = require('../models/produtoModel');

// Rota POST (Cadastrar)
exports.createProduto = async (req, res) => {
  // O frontend vai enviar (codigo, nome, preco, quantidade)
  // E o ID do fornecedor no campo 'fornecedor'
  const produto = new Produto({
    codigo: req.body.codigo,
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    preco: req.body.preco,
    fornecedor: req.body.fornecedor 
  });

  try {
    const novoProduto = await produto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rota GET /produtos (Listar Todos) 
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().populate('fornecedor');
    
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};