const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.getAllProdutos);

router.post('/produtos', produtoController.createProduto);

router.get('/produtos/pesquisar', produtoController.searchProdutos);

router.delete('/produtos/:id', produtoController.deleteProduto);

router.put('/produtos/:id', produtoController.updateProduto);

router.get(
  '/produtos/por-fornecedor/:id', 
  produtoController.getProdutosPorFornecedor
);

module.exports = router;