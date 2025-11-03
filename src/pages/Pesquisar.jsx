import './Pages.css'

function Pesquisar() {
  return (
    <div className="page-container">
      <h2>Pesquisar Produto</h2>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Digite o código ou nome do produto..."
          className="search-input"
        />
        <button className="btn-primary">Buscar</button>
      </div>
      <div className="content-placeholder">
        <p>🔍 Resultados da pesquisa aparecerão aqui</p>
      </div>
    </div>
  )
}

export default Pesquisar