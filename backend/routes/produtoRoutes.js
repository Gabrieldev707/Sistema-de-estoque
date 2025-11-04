const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produtos', produtoController.getAllProdutos);

router.post('/produtos', produtoController.createProduto);

// Rota para "Pesquisar Produto" 
// Usamos um "query param" (ex: /api/produtos/pesquisar?termo=lampada)
router.get('/produtos/pesquisar', produtoController.searchProdutos);

router.delete('/produtos/:id', produtoController.deleteProduto);

router.put('/produtos/:id', produtoController.updateProduto);

module.exports = router;