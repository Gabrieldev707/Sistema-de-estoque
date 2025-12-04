<h1 align="center">
<img src="./frontend/public/LogoREADME.png" alt="D'Luz Logo" width="600">

Sistema de Controle de Estoque

</h1>

<h4 align="center">Aplicação FullStack completa para gestão de produtos e fornecedores da DLuz Iluminação</a>.</h4>

<p align="center">
<img src="https://img.shields.io/badge/React-v19.1.1-blue?logo=react">
<img src="https://img.shields.io/badge/Node.js-v24.11.0-green?logo=nodedotjs">
<img src="https://img.shields.io/badge/MongoDB-v8.2.2-green?logo=mongodb">
<img src="https://img.shields.io/badge/Express-v5.1.0-yellow?logo=express">
<img src="https://img.shields.io/badge/Docker-Lastest-blue?logo=docker">
</p>

<p align="center"> 
<a href="#funcionalidades">Funcionalidades</a> •
<a href="#technologies">Tecnologias</a> •
<a href="#prints">Screenshots</a> •
<a href="#DocumentaçãoAPI">Documentação API</a> •
<a href="#comorodar">Como Rodar</a> •
<a href="#license">Autores</a>
</p>

<br>

<div id="funcionalidades">
 <h2>✨ Funcionalidades Principais</h2>

<table>
<tr>
<td width="50%">
<h3>📊 Dashboard Gerencial</h3>
<ul>
<li><strong>KPIs em Tempo Real:</strong> Visualize o valor total em estoque e quantidade de itens.</li>
<li><strong>Gráficos Interativos:</strong> Análise visual com gráficos de barras e pizza (Recharts).</li>
<li><strong>Alertas de Estoque:</strong> Monitoramento automático de itens críticos (< 15 unidades).</li>
</ul>
</td>
<td width="50%">
<h3>📦 Gestão de Produtos</h3>
<ul>
<li><strong>CRUD Completo:</strong> Cadastro, listagem, edição e exclusão.</li>
<li><strong>Busca Inteligente:</strong> Pesquise produtos por nome ou código instantaneamente.</li>
<li><strong>Paginação e Filtros:</strong> Navegação fluida mesmo com muitos itens.</li>
</ul>
</td>
</tr>
<tr>
<td>
<h3>🚚 Gestão de Fornecedores</h3>
<ul>
<li><strong>Vinculação Inteligente:</strong> Produtos são atrelados automaticamente aos seus fornecedores.</li>
<li><strong>Proteção de Dados:</strong> O sistema impede a exclusão acidental de fornecedores que possuem produtos ativos.</li>
</ul>
</td>
<td>
<h3>🔔 Notificações e UX</h3>
<ul>
<li><strong>Sistema de Toasts:</strong> Feedback visual imediato para todas as ações.</li>
<li><strong>Central de Notificações:</strong> Ícone de sino alertando sobre baixas no estoque.</li>
<li><strong>Design Responsivo:</strong> Funciona bem em desktops e tablets.</li>
</ul>
</td>
</tr>
</table>
</div>

<br>

<a name="technologies"></a>
 <h2>🛠️ Tecnologias Utilizadas</h2>
 
<div align="center">
  <table border="0">
    <tr>
      <td width="50%" valign="top" align="left">
        <h3>💻 Frontend</h3>
        <ul>
          <li><strong>Core & Build:</strong> React.js, Vite.</li>
          <li><strong>Roteamento:</strong> React Router Dom.</li>
          <li><strong>Visualização de Dados:</strong> Recharts.</li>
          <li><strong>Estilização & UI:</strong> CSS Modules, React Toastify.</li>
        </ul>
      </td>
      <td width="50%" valign="top" align="left">
        <h3>🧱 Backend</h3>
        <ul>
          <li><strong>Runtime:</strong> Node.js.</li>
          <li><strong>Framework:</strong> Express.</li>
          <li><strong>Modelagem de Dados:</strong> Mongoose.</li>
          <li><strong>Arquitetura:</strong> MVC / REST API.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top" align="left">
        <h3>🗄️ Banco de Dados</h3>
        <ul>
          <li><strong>SGBD:</strong> MongoDB.</li>
          <li><strong>Modo Nuvem:</strong> MongoDB Atlas.</li>
          <li><strong>Modo Local:</strong> Container Docker oficial.</li>
        </ul>
      </td>
      <td valign="top" align="left">
        <h3>⚙️ Ferramentas & DevOps</h3>
        <ul>
          <li><strong>Containerização:</strong> Docker.</li>
          <li><strong>Scripts:</strong> Concurrently.</li>
          <li><strong>Versionamento:</strong> Git & GitHub.</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

<br>

<a name="prints"></a>
<h2>📸 Screenshots</h2>
<table align="center">
<tr>
<td align="center" width="50%">
<img src="https://github.com/user-attachments/assets/4d8c29bc-a962-49b6-8517-640b1123781d" alt="Print 1" width="100%">
<br>
<sub><b>Visão Geral do Dashboard</b></sub>
</td>
<td align="center" width="50%">
<img src="https://github.com/user-attachments/assets/775bf76a-1cbc-424f-bae1-7dbbc2e0cbed" alt="Print 2" width="100%">
<br>
<sub><b>Tela de cadastrar produto/fornecedor</b></sub>
</td>
</tr>
<tr>
<td colspan="2" align="center">
<img src="https://github.com/user-attachments/assets/6a7e6d21-5c93-4ac3-a533-1fa97dff8d33" alt="Print 3" width="100%">
<br>
<sub><b>Tela de pesquisar produto</b></sub>
</td>
</tr>
</table>

<br>

<a name="DocumentaçãoAPI"></a>
<h2>🧪 Documentação API</h2>
<div align="center">
<p>
<strong>Acesse a documentação completa:</strong><br>
<a href="https://www.postman.com/technical-architect-83661009/my-workspace/collection/pifiz0c/dluz-documentao-api?action=share&creator=38542972" target="_blank">
🔗 > Link para o Postman <
</a>
</p>
<img src="https://github.com/user-attachments/assets/e4f7df69-297c-4d72-8900-b44ae4f84811" alt="Print da Documentação" width="600" />
</div>
 
<br>

<div id="comorodar"></div>

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/) (Versão LTS recomendada)
* [Docker](https://www.docker.com/) (Opcional, mas recomendado)

### 1. Clonagem e Dependências

```bash
# Clone este repositório
$ git clone https://github.com/Gabrieldev707/Sistema-de-estoque

# Acesse a pasta do projeto
$ cd Sistema-de-estoque

# Instale as dependências (Raiz, Frontend e Backend)
# Dica: Instalar separadamente evita erros em ambientes restritos
$ npm install
$ npm install --prefix frontend
$ npm install --prefix backend
```
### 2. Variáveis de Ambiente
Configure as credenciais antes de rodar.

📂 Configuração do Backend (.env)

```
# Crie o arquivo backend/.env:

PORT=4000

MONGODB_URL=mongodb+srv://gabrielazevedoxx_db_user:Naruto2017!@dluzbancodados.n90jist.mongodb.net/?appName=DluzBancoDados
```

📂 Configuração do Frontend (.env.development)
```
# Crie o arquivo frontend/.env.development:

VITE_API_URL=http://localhost:4000
```
### 3. Executando a Aplicação
```
$ npm run dev
```

<br>

<a name="license"></a>
<h2>👨‍💻 Autores</h2>

Desenvolvido por Gabriel, Kallyl, Mateus, Gedson e Leonardo.

Competência Criar serviços web com rest.

Professora Sheila Maria
