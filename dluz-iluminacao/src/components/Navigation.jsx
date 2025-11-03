import './Navigation.css'

function Navigation({ setPaginaAtual }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul>
          <li><button onClick={() => setPaginaAtual('produtos')}>Todos os Produtos</button></li>
          <li><button onClick={() => setPaginaAtual('fornecedores')}>Fornecedores</button></li>
          <li><button onClick={() => setPaginaAtual('pesquisar')}>Pesquisar</button></li>
          <li><button onClick={() => setPaginaAtual('cadastrar')}>Cadastrar Produto</button></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation