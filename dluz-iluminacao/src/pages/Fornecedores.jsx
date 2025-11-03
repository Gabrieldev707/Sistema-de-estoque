import './Pages.css'
import { useProdutos } from '../context/ProdutosContext'
import { useState } from 'react'

function Fornecedores() {
  const { produtos } = useProdutos()
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)

  // Calcular fornecedores e contagens
  const fornecedores = {}
  produtos.forEach(produto => {
    if (!fornecedores[produto.fornecedor]) {
      fornecedores[produto.fornecedor] = {
        nome: produto.fornecedor,
        quantidadeProdutos: 0,
        produtos: []
      }
    }
    fornecedores[produto.fornecedor].quantidadeProdutos++
    fornecedores[produto.fornecedor].produtos.push(produto)
  })

  const listaFornecedores = Object.values(fornecedores)

  const verProdutosFornecedor = (fornecedor) => {
    setFornecedorSelecionado(fornecedor)
  }

  const voltarParaLista = () => {
    setFornecedorSelecionado(null)
  }

  // Se um fornecedor está selecionado, mostra seus produtos
  if (fornecedorSelecionado) {
    return (
      <div className="page-container">
        <div className="cabecalho-fornecedor">
          <button className="btn-voltar" onClick={voltarParaLista}>
            ← Voltar para Fornecedores
          </button>
          <h2>Produtos de {fornecedorSelecionado.nome}</h2>
          <p className="subtitulo">
            {fornecedorSelecionado.quantidadeProdutos} produtos em estoque
          </p>
        </div>

        {fornecedorSelecionado.produtos.length === 0 ? (
          <div className="content-placeholder">
            <p>Nenhum produto deste fornecedor em estoque</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="produtos-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome do Produto</th>
                  <th>Quantidade</th>
                  <th>Preço (R$)</th>
                </tr>
              </thead>
              <tbody>
                {fornecedorSelecionado.produtos.map(produto => (
                  <tr key={produto.id}>
                    <td><strong>{produto.codigo}</strong></td>
                    <td>{produto.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  // Lista principal de fornecedores
  return (
    <div className="page-container">
      <h2>Fornecedores</h2>
      
      {listaFornecedores.length === 0 ? (
        <div className="content-placeholder">
          <p>Nenhum fornecedor cadastrado ainda</p>
          <p>🏢 Cadastre produtos para ver os fornecedores aqui</p>
        </div>
      ) : (
        <div className="fornecedores-grid">
          {listaFornecedores.map(fornecedor => (
            <div 
              key={fornecedor.nome} 
              className="card-fornecedor"
              onClick={() => verProdutosFornecedor(fornecedor)}
            >
              <div className="fornecedor-info">
                <h3>{fornecedor.nome}</h3>
                <p className="quantidade-produtos">
                  {fornecedor.quantidadeProdutos} {fornecedor.quantidadeProdutos === 1 ? 'produto' : 'produtos'}
                </p>
                <p className="ver-produtos">Clique para ver produtos →</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Fornecedores