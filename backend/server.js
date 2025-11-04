const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors()); 

app.get('/api/usuarios', (req, res) => {
  res.json([{ id: 1, nome: 'Usuário Teste' }]);
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});