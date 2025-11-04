const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.post('/fornecedores', fornecedorController.createFornecedor);

router.get('/fornecedores', fornecedorController.getAllFornecedores);

module.exports = router;