// 1. Carrega as variáveis de ambiente (do arquivo .env)
require('dotenv').config();

// 2. Importa os módulos principais
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 3. Importa os seus arquivos de rotas
const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
// (No futuro, você pode adicionar 'usuarioRoutes' para login, etc.)

// 4. Inicializa o Express
const app = express();
// Usa a porta do .env ou assume 4000
const PORT = process.env.PORT || 4000;

// 5. Configura os Middlewares
// Permite que seu frontend (Vercel) chame esta API
app.use(cors());
// Permite que o servidor leia JSON dos 'body' das requisições (ex: req.body)
app.use(express.json());

// 6. Conecta ao Banco de Dados MongoDB
// Pega a URL de conexão do seu arquivo backend/.env
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("Erro: MONGODB_URL não foi definida no arquivo .env");
  process.exit(1); // Para o processo se não houver URL do banco
}

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// 7. Define as Rotas da API
// Diz ao Express para usar os arquivos de rotas que importamos.
// Qualquer rota em 'produtoRoutes' começará com /api
// (Ex: GET /api/produtos)
app.use('/api', produtoRoutes);
// (Ex: GET /api/fornecedores)
app.use('/api', fornecedorRoutes);

// 8. Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});