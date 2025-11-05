const Fornecedor = require('../models/fornecedorModel');
const Produto = require('../models/produtoModel');

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


// Rota GET 
exports.getAllFornecedores = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rota DELETE /fornecedores/:id
exports.deleteFornecedor = async (req, res) => {
  try {
    const { id } = req.params;

    // 3. REGRA DE NEGÓCIO: Verifica se algum produto usa este fornecedor
    const produtos = await Produto.find({ fornecedor: id });
    if (produtos.length > 0) {
      // 400 = Bad Request (Requisição inválida)
      return res.status(400).json({ 
        message: `Não é possível excluir. Este fornecedor está associado a ${produtos.length} produto(s).` 
      });
    }

    // 4. Se não houver produtos, deleta o fornecedor
    const fornecedorDeletado = await Fornecedor.findByIdAndDelete(id);

    if (!fornecedorDeletado) {
      return res.status(404).json({ message: "Fornecedor não encontrado." });
    }

    res.status(200).json({ message: "Fornecedor excluído com sucesso." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};