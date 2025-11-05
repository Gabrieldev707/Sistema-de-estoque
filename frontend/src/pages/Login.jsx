import './login.css'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

// 1. Importe o useNavigate
import { useNavigate } from 'react-router-dom'

function Login() {
  const { login, carregando } = useAuth()
  
  // 2. Inicialize o hook de navegação
  const navigate = useNavigate()
  
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
    } else {
      // 3. A MÁGICA!
      // Se o login foi um sucesso, navegue o usuário
      // para a página principal.
      navigate('/') // Ou '/produtos', o que você preferir
    }
  }

  const handleChange = (e) => {
    setCredenciais({
      ...credenciais,
      [e.target.name]: e.target.value
    })
  }

  // O resto do seu JSX (formulário) continua
  // exatamente o mesmo...
  return (
    <div className="login-container">
      {/* ... seu formulário aqui ... */}
      <div className="login-card">
        <div className="login-header">
            {/* CORREÇÃO DA IMAGEM: Remova o '/public' */}
            <img src="/LOGO.pdf.png" alt="Senz Iluminação & Acabamentos" className="logo" />
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