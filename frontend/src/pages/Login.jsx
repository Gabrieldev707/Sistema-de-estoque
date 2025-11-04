import './login.css'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

function Login() {
  const { login, carregando } = useAuth()
  const [credenciais, setCredenciais] = useState({
    usuario: '',
    senha: ''
  })
  const [erro, setErro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!credenciais.usuario || !credenciais.senha) {
      setErro('Preencha todos os campos!')
      return
    }

    const usuarioLogado = await login(credenciais.usuario, credenciais.senha)
    
    if (!usuarioLogado) {
      setErro('Usuário ou senha incorretos!')
    }
  }

  const handleChange = (e) => {
    setCredenciais({
      ...credenciais,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
           <img src="/public/LOGO.pdf.png" alt="Senz Iluminação & Acabamentos" className="logo" />
          <p><strong>Sistema de Controle de Estoque</strong></p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {erro && (
            <div className="mensagem-erro">
              {erro}
            </div>
          )}

          <div className="form-group">
            <label>Usuário</label>
            <input 
              type="text" 
              name="usuario"
              value={credenciais.usuario}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite seu usuário"
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              name="senha"
              value={credenciais.senha}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite sua senha"
              disabled={carregando}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
    )
  }
export default Login