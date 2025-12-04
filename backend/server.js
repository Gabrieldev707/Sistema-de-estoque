require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const errorMiddleware = require('./middlewares/errorMiddleware');
const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

// 5. Configura os Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("Erro: MONGODB_URL não foi definida no arquivo .env");
  process.exit(1);
}

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

//  Configura as Rotas
app.use('/api', produtoRoutes);
app.use('/api', fornecedorRoutes);
app.use(require('./middlewares/notFoundMiddleware'));

app.use(errorMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});