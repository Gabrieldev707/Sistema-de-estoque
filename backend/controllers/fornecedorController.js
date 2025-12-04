const Fornecedor = require('../models/fornecedorModel');
const Produto = require('../models/produtoModel');
const asyncHandler = require('../utils/asyncHandler');

// Rota POST Cadastrar
exports.createFornecedor = asyncHandler(async (req, res) => {
  const fornecedor = new Fornecedor({
    nome: req.body.nome
  });

  const novoFornecedor = await fornecedor.save();
  res.status(201).json(novoFornecedor);
});

// Rota GET Listar com contagem de produtos
exports.getAllFornecedores = asyncHandler(async (req, res) => {
  const fornecedoresComContagem = await Fornecedor.aggregate([
    {
      $lookup: {
        from: 'produtos',
        localField: '_id',
        foreignField: 'fornecedor',
        as: 'produtosDoFornecedor'
      }
    },
    {
      $project: {
        nome: 1, 
        quantidadeProdutos: { $size: '$produtosDoFornecedor' }
      }
    }
  ]);
  
  res.status(200).json(fornecedoresComContagem);
});

// Rota DELETE /fornecedores/:id
exports.deleteFornecedor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const produtos = await Produto.find({ fornecedor: id });
  
  if (produtos.length > 0) {
    res.status(400);
    throw new Error(`Não é possível excluir. Este fornecedor está associado a ${produtos.length} produto(s).`);
  }

  const fornecedorDeletado = await Fornecedor.findByIdAndDelete(id);

  if (!fornecedorDeletado) {
    res.status(404);
    throw new Error("Fornecedor não encontrado.");
  }

  res.status(200).json({ message: "Fornecedor excluído com sucesso." });
});