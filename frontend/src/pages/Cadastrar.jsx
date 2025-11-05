import './Cadastrar.css'
// 1. Importe useEffect (para carregar fornecedores)
import { useState, useEffect } from 'react'

// Pega a URL da API do seu .env (ex: VITE_API_URL=http://localhost:4000)
const API_URL = import.meta.env.VITE_API_URL;

function Cadastrar() {
  // --- Estados do Formulário de PRODUTO ---
  const [produtoFormData, setProdutoFormData] = useState({
    codigo: '',
    nome: '',
    fornecedor: '', // Vai guardar o ID do fornecedor
    quantidade: '',
    preco: ''
  })
  const [produtoMensagem, setProdutoMensagem] = useState('')

  // --- Estados do Formulário de FORNECEDOR ---
  const [fornecedorNome, setFornecedorNome] = useState('')
  const [fornecedorMensagem, setFornecedorMensagem] = useState('')

  // --- Estado da Lista de Fornecedores (para o Dropdown) ---
  const [fornecedores, setFornecedores] = useState([])

  // --- Função para buscar fornecedores da API ---
  const fetchFornecedores = async () => {
    try {
      const response = await fetch(`${API_URL}/api/fornecedores`)
      if (!response.ok) throw new Error('Erro ao buscar fornecedores');
      const data = await response.json()
      setFornecedores(data)
    } catch (error) {
      setProdutoMensagem(`Erro: ${error.message}`)
    }
  }

  //  Buscar fornecedores quando o componente carregar
  useEffect(() => {
    fetchFornecedores()
  }, []) 

  const handleProdutoSubmit = async (e) => {
    e.preventDefault()
    setProdutoMensagem('')
    
    if (!produtoFormData.codigo || !produtoFormData.nome || !produtoFormData.fornecedor) {
      setProdutoMensagem('Preencha todos os campos obrigatórios!')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...produtoFormData,
          quantidade: parseInt(produtoFormData.quantidade) || 0,
          preco: parseFloat(produtoFormData.preco) || 0
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || 'Erro ao cadastrar produto')
      }

      setProdutoMensagem('Produto cadastrado com sucesso! ✅')
      setProdutoFormData({
        codigo: '', nome: '', fornecedor: '', quantidade: '', preco: ''
      })
      setTimeout(() => setProdutoMensagem(''), 3000)

    } catch (error) {
      setProdutoMensagem(`Erro: ${error.message}`)
    }
  }

  const handleFornecedorSubmit = async (e) => {
    e.preventDefault()
    setFornecedorMensagem('')

    if (!fornecedorNome) {
      setFornecedorMensagem('O nome do fornecedor é obrigatório!')
      return
    }

    try {
      // 4. CHAMA A API DO BACKEND
      const response = await fetch(`${API_URL}/api/fornecedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: fornecedorNome })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.message || 'Erro ao cadastrar fornecedor')
      }

      setFornecedorMensagem('Fornecedor cadastrado com sucesso! ✅')
      setFornecedorNome('')
      
      fetchFornecedores() 
      
      setTimeout(() => setFornecedorMensagem(''), 3000)

    } catch (error) {
      setFornecedorMensagem(`Erro: ${error.message}`)
    }
  }

  const handleProdutoChange = (e) => {
    setProdutoFormData({
      ...produtoFormData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page-container">
      
      {/* Container principal que divide a tela em duas */}
      <div className="cadastrar-layout">

        {/* Cadastrar Produto */}
        <div className="form-wrapper">
          <h2>Cadastrar Novo Produto</h2>
          
          {produtoMensagem && (
            <div className={`mensagem ${produtoMensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
              {produtoMensagem}
            </div>
          )}

          <form onSubmit={handleProdutoSubmit} className="form-container">
            {/* Input de Código */}
            <div className="form-group">
              <label>Código do Produto</label>
              <input 
                type="text" 
                name="codigo"
                value={produtoFormData.codigo}
                onChange={handleProdutoChange}
                className="form-input" 
                placeholder="Ex: LMP-LED-001"
              />
            </div>

            {/* Input de Nome */}
            <div className="form-group">
              <label>Nome do Produto</label>
              <input 
                type="text" 
                name="nome"
                value={produtoFormData.nome}
                onChange={handleProdutoChange}
                className="form-input" 
                placeholder="Ex: Lâmpada LED 9W"
              />
            </div>

            <div className="form-group">
              <label>Fornecedor</label>
              <select 
                name="fornecedor"
                value={produtoFormData.fornecedor} 
                onChange={handleProdutoChange}
                className="form-input"
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
                name="quantidade"
                value={produtoFormData.quantidade}
                onChange={handleProdutoChange}
                className="form-input" 
                placeholder="0"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Preço (R$)</label>
              <input 
                type="number" 
                name="preco"
                value={produtoFormData.preco}
                onChange={handleProdutoChange}
                className="form-input" 
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <button type="submit" className="btn-primary btn-large">
              Cadastrar Produto
            </button>
          </form>
        </div>


        {/* Cadastrar Fornecedor */}
        <div className="form-wrapper">
          <h2>Cadastrar Fornecedor</h2>
          <p>Não encontrou o fornecedor na lista? Adicione um novo aqui.</p>
          
          {fornecedorMensagem && (
            <div className={`mensagem ${fornecedorMensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
              {fornecedorMensagem}
            </div>
          )}

          <form onSubmit={handleFornecedorSubmit} className="form-container">
            <div className="form-group">
              <label>Nome do Novo Fornecedor</label>
              <input 
                type="text" 
                name="nomeFornecedor"
                value={fornecedorNome}
                onChange={(e) => setFornecedorNome(e.target.value)}
                className="form-input" 
                placeholder="Ex: Luz & Cia"
              />
            </div>
            <button type="submit" className="btn-secondary btn-large">
              Cadastrar Fornecedor
            </button>
          </form>
        </div> 

      </div>
    </div>
  )
}

export default Cadastrar