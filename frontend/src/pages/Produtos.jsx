import './Pages.css'
import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)
  const [produtoParaEditar, setProdutoParaEditar] = useState(null)
  const [formEdicao, setFormEdicao] = useState({})
  
  const fetchData = async () => {
    setLoading(true)
    setErro(null)
    try {
      const [produtosRes, fornecedoresRes] = await Promise.all([
        fetch(`${API_URL}/api/produtos`),
        fetch(`${API_URL}/api/fornecedores`)
      ]);

      if (!produtosRes.ok) throw new Error('Erro ao buscar produtos da API.');
      if (!fornecedoresRes.ok) throw new Error('Erro ao buscar fornecedores da API.');

      const produtosData = await produtosRes.json();
      const fornecedoresData = await fornecedoresRes.json();

      setProdutos(produtosData);
      setFornecedores(fornecedoresData); 

    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) 

  
  const iniciarEdicao = (produto) => {
    setProdutoParaEditar(produto)
    setFormEdicao({
      ...produto,
      fornecedor: produto.fornecedor._id
    })
  }

  const salvarEdicao = async (e) => {
    e.preventDefault()
    if (!produtoParaEditar) return;

    try {
      const response = await fetch(`${API_URL}/api/produtos/${produtoParaEditar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEdicao)
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar. Verifique se o código já existe.');
      }

      await fetchData(); 
      
      cancelarEdicao() 
    } catch (err) {
      setErro(err.message)
    }
  }

  const cancelarEdicao = () => {
    setProdutoParaEditar(null)
    setFormEdicao({})
  }

  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto)
  }

  const executarExclusao = async () => {
    if (!produtoParaExcluir) return;

    try {
      const response = await fetch(`${API_URL}/api/produtos/${produtoParaExcluir._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o produto.');
      }

      setProdutos(produtos.filter(p => p._id !== produtoParaExcluir._id))
      cancelarExclusao()

    } catch (err) {
      setErro(err.message)
    }
  }

  const cancelarExclusao = () => {
    setProdutoParaExcluir(null)
  }


  if (loading) {
    return (
      <div className="page-container">
        <div className="content-placeholder"><p>Carregando produtos...</p></div>
      </div>
    )
  }

  if (erro) {
    return <div className="page-container"><div className="mensagem erro">{erro}</div></div>
  }

  return (
    <div className="page-container">
      <h2>Todos os Produtos</h2>
      
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
                  name="fornecedor"
                  value={formEdicao.fornecedor} 
                  onChange={(e) => setFormEdicao({...formEdicao, fornecedor: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Selecione um fornecedor</option>
                  {fornecedores.map(fornecedor => (
                    <option key={fornecedor._id} value={fornecedor._id}>
                      {fornecedor.nome}
                    </option>
                  ))}
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
                <tr key={produto._id}>
                  <td><strong>{produto.codigo}</strong></td>
                  <td>{produto.nome}</td>
                  <td>{produto.fornecedor?.nome || 'N/D'}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {(produto.preco || 0).toFixed(2)}</td>
                  <td>
                    <div className="acoes-botoes">
                      <button 
                        className="btn-editar"
                        onClick={() => iniciarEdicao(produto)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-excluir pequeno"
                        onClick={() => confirmarExclusao(produto)}
                      >
                        Excluir
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