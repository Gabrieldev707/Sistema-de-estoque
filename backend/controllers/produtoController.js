const Produto = require('../models/produtoModel');

// Rota POST Cadastrar
exports.createProduto = async (req, res) => {
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

// Rota GET /produtos Listar Todos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().populate('fornecedor');
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rota GET /produtos/pesquisar
exports.searchProdutos = async (req, res) => {
  try {
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

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rota DELETE /produtos/:id
exports.deleteProduto = async (req, res) => {
  try {
    const id = req.params.id;
    
    const produtoDeletado = await Produto.findByIdAndDelete(id);

    if (!produtoDeletado) {
      return res.status(404).json({ message: "Produto não encontrado para exclusão" });
    }

    res.status(200).json({ message: `Produto ${produtoDeletado.nome} excluído com sucesso` });
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rota PUT /produtos/:id
exports.updateProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const dadosParaAtualizar = req.body;
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id, 
      dadosParaAtualizar, 
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado para atualização" });
    }
    
    res.status(200).json(produtoAtualizado);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rota GET /produtos/por-fornecedor/:id
// Busca produtos de UM fornecedor específico
exports.getProdutosPorFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const produtos = await Produto.find({ fornecedor: id });

    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};