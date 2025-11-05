import './Pages.css'
import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

function Pesquisar() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [fornecedores, setFornecedores] = useState([]) 
  const [produtoParaEditar, setProdutoParaEditar] = useState(null)
  const [formEdicao, setFormEdicao] = useState({})

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch(`${API_URL}/api/fornecedores`)
        if (!response.ok) throw new Error('Erro ao buscar fornecedores');
        const data = await response.json()
        setFornecedores(data)
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchFornecedores();
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!termoBusca) {
      setErro('Por favor, digite um termo para buscar.');
      setResultados([])
      setBuscaRealizada(true)
      return;
    }
    setLoading(true);
    setErro(null);
    setBuscaRealizada(true);

    try {
      const response = await fetch(`${API_URL}/api/produtos/pesquisar?termo=${termoBusca}`);
      if (!response.ok) throw new Error('Erro ao buscar produtos.');
      const data = await response.json();
      setResultados(data);
    } catch (err) {
      setErro(err.message);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/produtos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir produto.');
      }
      setResultados(resultados.filter(p => p._id !== id));
    } catch (err) {
      setErro(err.message);
    }
  };
  
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
        const errData = await response.json()
        throw new Error(errData.message || 'Falha ao salvar. Verifique se o código já existe.');
      }
      
      const produtoAtualizado = await response.json();
      const fornecedorObj = fornecedores.find(f => f._id === produtoAtualizado.fornecedor);
      
      setResultados(resultados.map(p => 
        p._id === produtoAtualizado._id 
          ? { ...produtoAtualizado, fornecedor: fornecedorObj } 
          : p 
      ));
      
      cancelarEdicao()
    } catch (err) {
      setErro(err.message)
    }
  }

  const cancelarEdicao = () => {
    setProdutoParaEditar(null)
    setFormEdicao({})
  }

  const renderizarResultados = () => {
    if (loading) {
      return (
        <div className="content-placeholder">
          <p>🔍 Buscando...</p>
        </div>
      );
    }

    if (erro && !produtoParaEditar) {
      return <div className="mensagem erro">{erro}</div>;
    }

    if (!buscaRealizada) {
      return (
        <div className="content-placeholder">
          <p>🔍 Resultados da pesquisa aparecerão aqui</p>
        </div>
      );
    }

    if (resultados.length === 0) {
      return (
        <div className="content-placeholder">
          <p>😕 Nenhum resultado encontrado para "<strong>{termoBusca}</strong>".</p>
        </div>
      );
    }

    return (
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
            {resultados.map(produto => (
              <tr key={produto._id}>
                <td><strong>{produto.codigo}</strong></td>
                <td>{produto.nome}</td>
                <td>{produto.fornecedor?.nome || 'N/D'}</td>
                <td>{produto.quantidade}</td>
                <td>R$ {(produto.preco || 0).toFixed(2)}</td>
                <td className="acoes-botoes">
                  <button 
                    onClick={() => iniciarEdicao(produto)} 
                    className="btn-editar"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleExcluir(produto._id)} 
                    className="btn-excluir"
                  >
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="page-container">
      <h2>Pesquisar Produto</h2>
      

      <form onSubmit={handleSearch} className="search-container">
        <input 
          type="text" 
          placeholder="Digite o código ou nome do produto..."
          className="search-input"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '...' : 'Buscar'}
        </button>
      </form>
      
      {erro && produtoParaEditar && (
         <div className="mensagem erro">{erro}</div>
      )}

      {renderizarResultados()}

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
                  value={(formEdicao.preco || 0).toFixed(2)}
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
    </div>
  )
}

export default Pesquisar