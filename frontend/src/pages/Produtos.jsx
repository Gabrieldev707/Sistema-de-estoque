import './Pages.css'
// 1. Importar useState e useEffect
import { useState, useEffect } from 'react'

// Pega a URL da API do seu .env
const API_URL = import.meta.env.VITE_API_URL;

function Produtos() {
  // --- Estados do Componente ---
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([]) // Para o modal de edição
  
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  // --- Estados dos Modais (Lógica de UI) ---
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)
  const [produtoParaEditar, setProdutoParaEditar] = useState(null)
  const [formEdicao, setFormEdicao] = useState({})
  
  // --- Função para buscar TODOS os dados (Produtos e Fornecedores) ---
  const fetchData = async () => {
    setLoading(true)
    setErro(null)
    try {
      // 2. Busca produtos e fornecedores em paralelo
      const [produtosRes, fornecedoresRes] = await Promise.all([
        fetch(`${API_URL}/api/produtos`),
        fetch(`${API_URL}/api/fornecedores`)
      ]);

      if (!produtosRes.ok) throw new Error('Erro ao buscar produtos da API.');
      if (!fornecedoresRes.ok) throw new Error('Erro ao buscar fornecedores da API.');

      const produtosData = await produtosRes.json();
      const fornecedoresData = await fornecedoresRes.json();

      setProdutos(produtosData);
      setFornecedores(fornecedoresData); // Salva fornecedores para o dropdown

    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 3. Buscar os dados quando o componente carregar
  useEffect(() => {
    fetchData()
  }, []) // [] vazio = rodar só uma vez

  
  // --- 🔧 FUNÇÕES DE EDIÇÃO (CONECTADAS À API) ---
  const iniciarEdicao = (produto) => {
    setProdutoParaEditar(produto)
    // 4. Preenche o formulário.
    // IMPORTANTE: O 'fornecedor' vem como um objeto, mas o <select>
    // espera apenas o ID.
    setFormEdicao({
      ...produto,
      fornecedor: produto.fornecedor._id // Armazena SÓ o ID no formulário
    })
  }

  const salvarEdicao = async (e) => {
    e.preventDefault()
    if (!produtoParaEditar) return;

    try {
      // 5. Chama a API 'PUT' para atualizar
      const response = await fetch(`${API_URL}/api/produtos/${produtoParaEditar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEdicao)
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar. Verifique se o código já existe.');
      }

      // 6. Atualiza a lista de produtos no frontend
      // Recarrega os dados para pegar o produto com '.populate()'
      await fetchData(); 
      
      cancelarEdicao() // Fecha o modal
    } catch (err) {
      setErro(err.message)
    }
  }

  const cancelarEdicao = () => {
    setProdutoParaEditar(null)
    setFormEdicao({})
  }

  // --- 🗑️ FUNÇÕES DE EXCLUSÃO (CONECTADAS À API) ---
  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto)
  }

  const executarExclusao = async () => {
    if (!produtoParaExcluir) return;

    try {
      // 7. Chama a API 'DELETE'
      const response = await fetch(`${API_URL}/api/produtos/${produtoParaExcluir._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o produto.');
      }

      // 8. Remove o produto da lista no frontend (UI)
      setProdutos(produtos.filter(p => p._id !== produtoParaExcluir._id))
      cancelarExclusao() // Fecha o modal

    } catch (err) {
      setErro(err.message)
    }
  }

  const cancelarExclusao = () => {
    setProdutoParaExcluir(null)
  }

  // --- Renderização ---

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
      
      {/* Modal de Edição */}
      {produtoParaEditar && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Produto</h3>
            <form onSubmit={salvarEdicao}>
              {/* (Input Código) */}
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

              {/* (Input Nome) */}
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

              {/* (Select Fornecedor - AGORA CONECTADO) */}
              <div className="form-group">
                <label>Fornecedor *</label>
                <select 
                  name="fornecedor"
                  value={formEdicao.fornecedor} // O 'value' é o ID
                  onChange={(e) => setFormEdicao({...formEdicao, fornecedor: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Selecione um fornecedor</option>
                  {/* 9. Popula o dropdown com os fornecedores reais */}
                  {fornecedores.map(fornecedor => (
                    <option key={fornecedor._id} value={fornecedor._id}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* (Input Quantidade) */}
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

              {/* (Input Preço) */}
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

              {/* (Botões do Modal) */}
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

      {/* Tabela Principal de Produtos */}
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
              {/* 10. Atualiza a tabela para usar os dados da API */}
              {produtos.map(produto => (
                <tr key={produto._id}>
                  <td><strong>{produto.codigo}</strong></td>
                  <td>{produto.nome}</td>
                  {/* Usa o '.nome' do objeto fornecedor populado */}
                  <td>{produto.fornecedor?.nome || 'N/D'}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {(produto.preco || 0).toFixed(2)}</td>
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