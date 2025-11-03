import './Pages.css'
import { useProdutos } from '../context/ProdutosContext'
import { useState } from 'react'

function Produtos() {
  const { produtos, excluirProduto, editarProduto } = useProdutos()
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)
  const [produtoParaEditar, setProdutoParaEditar] = useState(null)
  const [formEdicao, setFormEdicao] = useState({})

  // 🔧 FUNÇÕES DE EDIÇÃO
  const iniciarEdicao = (produto) => {
    setProdutoParaEditar(produto)
    setFormEdicao({ ...produto })
  }

  const salvarEdicao = (e) => {
    e.preventDefault()
    if (produtoParaEditar) {
      editarProduto(produtoParaEditar.id, formEdicao)
      setProdutoParaEditar(null)
      setFormEdicao({})
    }
  }

  const cancelarEdicao = () => {
    setProdutoParaEditar(null)
    setFormEdicao({})
  }

  // 🗑️ FUNÇÕES DE EXCLUSÃO
  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto)
  }

  const executarExclusao = () => {
    if (produtoParaExcluir) {
      excluirProduto(produtoParaExcluir.id)
      setProdutoParaExcluir(null)
    }
  }

  const cancelarExclusao = () => {
    setProdutoParaExcluir(null)
  }

  return (
    <div className="page-container">
      <h2>Todos os Produtos</h2>
      
      {/* Modal de Edição */}
      {produtoParaEditar && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Produto</h3>
            <form onSubmit={salvarEdicao}>
              <div className="form-group">
                <label>Código do Produto *</label>
                <input 
                  type="text" 
                  value={formEdicao.codigo || ''}
                  onChange={(e) => setFormEdicao({...formEdicao, codigo: e.target.value})}
                  className="form-input" 
                  required
                />
              </div>

              <div className="form-group">
                <label>Nome do Produto *</label>
                <input 
                  type="text" 
                  value={formEdicao.nome || ''}
                  onChange={(e) => setFormEdicao({...formEdicao, nome: e.target.value})}
                  className="form-input" 
                  required
                />
              </div>

              <div className="form-group">
                <label>Fornecedor *</label>
                <select 
                  value={formEdicao.fornecedor || ''}
                  onChange={(e) => setFormEdicao({...formEdicao, fornecedor: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Selecione um fornecedor</option>
                  <option value="Luz & Cia">Luz & Cia</option>
                  <option value="Ilumina Brasil">Ilumina Brasil</option>
                  <option value="LED Masters">LED Masters</option>
                  <option value="Casa da Lâmpada">Casa da Lâmpada</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantidade em Estoque</label>
                <input 
                  type="number" 
                  value={formEdicao.quantidade || ''}
                  onChange={(e) => setFormEdicao({...formEdicao, quantidade: parseInt(e.target.value) || 0})}
                  className="form-input" 
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Preço (R$)</label>
                <input 
                  type="number" 
                  value={formEdicao.preco || ''}
                  onChange={(e) => setFormEdicao({...formEdicao, preco: parseFloat(e.target.value) || 0})}
                  className="form-input" 
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn-cancelar" onClick={cancelarEdicao}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {produtoParaExcluir && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir o produto:</p>
            <p><strong>{produtoParaExcluir.nome}</strong> ({produtoParaExcluir.codigo})?</p>
            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={cancelarExclusao}>
                Cancelar
              </button>
              <button className="btn-excluir" onClick={executarExclusao}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {produtos.length === 0 ? (
        <div className="content-placeholder">
          <p>Nenhum produto cadastrado ainda</p>
          <p>📦 Use a opção "Cadastrar Produto" para adicionar itens ao estoque</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="produtos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome do Produto</th>
                <th>Fornecedor</th>
                <th>Quantidade</th>
                <th>Preço (R$)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr key={produto.id}>
                  <td><strong>{produto.codigo}</strong></td>
                  <td>{produto.nome}</td>
                  <td>{produto.fornecedor}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>
                    <div className="acoes-botoes">
                      <button 
                        className="btn-editar"
                        onClick={() => iniciarEdicao(produto)}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="btn-excluir pequeno"
                        onClick={() => confirmarExclusao(produto)}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Produtos