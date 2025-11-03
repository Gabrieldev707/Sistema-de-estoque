import './Pages.css'
import { useProdutos } from '../context/ProdutosContext'
import { useState } from 'react'

function Cadastrar() {
  const { adicionarProduto } = useProdutos()
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    fornecedor: '',
    quantidade: '',
    preco: ''
  })
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.codigo || !formData.nome || !formData.fornecedor) {
      setMensagem('Preencha todos os campos obrigatórios!')
      return
    }

    adicionarProduto({
      codigo: formData.codigo,
      nome: formData.nome,
      fornecedor: formData.fornecedor,
      quantidade: parseInt(formData.quantidade) || 0,
      preco: parseFloat(formData.preco) || 0
    })

    setMensagem('Produto cadastrado com sucesso! ✅')
    setFormData({
      codigo: '',
      nome: '',
      fornecedor: '',
      quantidade: '',
      preco: ''
    })

    setTimeout(() => setMensagem(''), 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page-container">
      <h2>Cadastrar Novo Produto</h2>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Código do Produto *</label>
          <input 
            type="text" 
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="form-input" 
            placeholder="Ex: LMP-LED-001"
          />
        </div>

        <div className="form-group">
          <label>Nome do Produto *</label>
          <input 
            type="text" 
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-input" 
            placeholder="Ex: Lâmpada LED 9W"
          />
        </div>

        <div className="form-group">
          <label>Fornecedor *</label>
          <select 
            name="fornecedor"
            value={formData.fornecedor}
            onChange={handleChange}
            className="form-input"
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
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
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
            value={formData.preco}
            onChange={handleChange}
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
  )
}

export default Cadastrar