const Produto = require('../models/produtoModel');
const asyncHandler = require('../utils/asyncHandler'); 

// Rota POST Cadastrar
exports.createProduto = asyncHandler(async (req, res) => {
  const produto = new Produto({
    codigo: req.body.codigo,
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    preco: req.body.preco,
    fornecedor: req.body.fornecedor 
  });

  const novoProduto = await produto.save();
  res.status(201).json(novoProduto);
});

// Rota GET /produtos Listar Todos
exports.getAllProdutos = asyncHandler(async (req, res) => {
  const produtos = await Produto.find().populate('fornecedor');
  res.status(200).json(produtos);
});

// Rota GET /produtos/pesquisar
exports.searchProdutos = asyncHandler(async (req, res) => {
  const { termo } = req.query;
  
  if (!termo) {
    return res.status(200).json([]);
  }
  
  const query = {
    $or: [
      { codigo: { $regex: termo, $options: 'i' } },
      { nome: { $regex: termo, $options: 'i' } }
    ]
  };

  const produtos = await Produto.find(query).populate('fornecedor');
  res.status(200).json(produtos);
});

// Rota DELETE /produtos/:id
exports.deleteProduto = asyncHandler(async (req, res) => {
  const id = req.params.id;
  
  const produtoDeletado = await Produto.findByIdAndDelete(id);

  if (!produtoDeletado) {
    res.status(404);
    throw new Error("Produto não encontrado para exclusão");
  }

  res.status(200).json({ message: `Produto ${produtoDeletado.nome} excluído com sucesso` });
});

// Rota PUT /produtos/:id
exports.updateProduto = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const dadosParaAtualizar = req.body;
  
  const produtoAtualizado = await Produto.findByIdAndUpdate(
    id, 
    dadosParaAtualizar, 
    { new: true, runValidators: true }
  );

  if (!produtoAtualizado) {
    res.status(404);
    throw new Error("Produto não encontrado para atualização");
  }
  
  res.status(200).json(produtoAtualizado);
});

// Rota GET /produtos/por-fornecedor/:id
exports.getProdutosPorFornecedor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const produtos = await Produto.find({ fornecedor: id });

  res.status(200).json(produtos);
});

// Rota GET /produtos/baixo-estoque
exports.getProdutosBaixoEstoque = asyncHandler(async (req, res) => {
  const produtosCriticos = await Produto.find({ 
    quantidade: { $lt: 15 } 
  }).populate('fornecedor');

  res.status(200).json(produtosCriticos);
});