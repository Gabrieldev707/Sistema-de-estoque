Sistema de Controle de Estoque (D'Luz)

 Projeto Full Stack (MERN) desenvolvido para o gerenciamento de estoque de uma empresa de iluminação. O sistema permite o cadastro, listagem, edição e exclusão de produtos e fornecedores, com uma interface moderna e responsiva.

🚀 Tecnologias Utilizadas

Frontend

React.js (com Vite)

React Router Dom (Navegação SPA)

Context API (Gerenciamento de estado global)

CSS3 (Estilização personalizada e responsiva)

Backend

Node.js & Express

MongoDB & Mongoose (Banco de dados NoSQL)

Cors & Dotenv

Infraestrutura & Ferramentas

Docker & Docker Compose (Para containerização do ambiente)

MongoDB Atlas (Banco de dados na nuvem)

Vercel (Deploy do Frontend)

Render (Deploy do Backend)

Concurrently (Para rodar múltiplos scripts simultaneamente)

✨ Funcionalidades

Autenticação: Tela de login (simulada) para acesso ao sistema.

Dashboard de Produtos:

Listagem completa de produtos com paginação (tabela).

Cadastro de novos produtos com validação.

Edição de produtos existentes via modal.

Exclusão de produtos.

Gestão de Fornecedores:

Cadastro rápido de fornecedores.

Visualização de fornecedores e contagem automática de produtos associados.

Bloqueio de exclusão de fornecedores que possuem produtos vinculados (Regra de Negócio).

Pesquisa:

Busca inteligente de produtos por Nome ou Código.

📦 Como Rodar o Projeto Localmente

Você pode rodar este projeto de duas formas: usando Docker (recomendado) ou via Node.js (modo manual/faculdade).

Pré-requisitos

Ter o Git instalado.

Ter o Node.js instalado.

(Opcional) Ter o Docker Desktop instalado.

1. Clonar o Repositório

git clone [https://github.com/Gabrieldev707/Sistema-de-estoque.git](https://github.com/Gabrieldev707/Sistema-de-estoque.git)
cd Sistema-de-estoque


2. Configurar Variáveis de Ambiente

Crie um arquivo .env dentro da pasta backend/ com a seguinte configuração:

# backend/.env
PORT=4000
# Se usar Docker local:
# MONGODB_URL=mongodb://localhost:27017/dluzdatabase
# Se usar MongoDB Atlas (Nuvem):
MONGODB_URL=mongodb+srv://<usuario>:<senha>@cluster0.xyz.mongodb.net/dluzdatabase


Crie um arquivo .env.development dentro da pasta frontend/:

# frontend/.env.development
VITE_API_URL=http://localhost:4000


3. Instalar Dependências

Na raiz do projeto, execute:

npm install
# O script 'postinstall' irá instalar automaticamente as dependências do frontend e backend.


(Caso esteja em um ambiente restrito/Windows sem admin, instale manualmente em cada pasta)

4. Rodar a Aplicação

Opção A: Com Docker (Recomendado)

Este comando sobe o banco de dados (MongoDB) via Docker e inicia o Frontend e Backend localmente.

npm run dev


Opção B: Sem Docker ("Modo Faculdade")

Este comando roda apenas o Frontend e Backend, conectando-se ao MongoDB Atlas (requer internet e configuração do .env com a URL do Atlas).

npm run dev:nodb


🌐 Deploy (Produção)

O projeto está configurado para deploy contínuo:

Frontend: Hospedado na Vercel.

Backend: Hospedado no Render.

Banco de Dados: Hospedado no MongoDB Atlas.

👨‍💻 Autores

Desenvolvido por Gabriel, Kallyl, Mateus, Gedson e Leonardo.
