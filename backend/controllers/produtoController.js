const Produto = require('../models/produtoModel');

// Rota POST (Cadastrar)
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

// Rota GET /produtos (Listar Todos) 
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
    
    // Lógica real de delete do Mongoose:
    const produtoDeletado = await Produto.findByIdAndDelete(id);

    if (!produtoDeletado) {
      // Se não achou o produto, retorna 404
      return res.status(404).json({ message: "Produto não encontrado para exclusão" });
    }

    // Se deu certo, retorna sucesso
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

    // Lógica real de update do Mongoose:
    // { new: true } -> Faz o Mongoose retornar o documento *depois* da atualização
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id, 
      dadosParaAtualizar, 
      { new: true, runValidators: true } // 'runValidators' força o Mongoose a checar o 'required' do Model
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado para atualização" });
    }
    
    // Retorna o produto com os dados novos
    res.status(200).json(produtoAtualizado);

  } catch (error) {
    // Erro 400 = Bad Request (provavelmente um 'codigo' duplicado)
    res.status(400).json({ message: error.message });
  }
};

// Rota GET /produtos/por-fornecedor/:id
// Busca produtos de UM fornecedor específico
exports.getProdutosPorFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Encontra todos os produtos onde o campo 'fornecedor'
    // bate com o ID que recebemos na URL
    const produtos = await Produto.find({ fornecedor: id });

    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};