import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true) // Começa como true para verificar localStorage

  // USUÁRIOS PRÉ-CADASTRADOSaa
  const usuariosCadastrados = [
    { 
      usuario: "pai", 
      senha: "senha123", 
      nome: "Seu Pai", 
      tipo: "dono",
      email: "pai@dluz.com"
    },
    { 
      usuario: "mae", 
      senha: "senha123", 
      nome: "Sua Mãe", 
      tipo: "dono",
      email: "mae@dluz.com"
    },
    { 
      usuario: "funcionario", 
      senha: "senha123", 
      nome: "Funcionário", 
      tipo: "funcionario",
      email: "funcionario@dluz.com"
    }
  ]

  const login = (usuarioInput, senhaInput) => {
    setCarregando(true)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const usuarioEncontrado = usuariosCadastrados.find(
          u => u.usuario === usuarioInput && u.senha === senhaInput
        )

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado)
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
        }
        
        setCarregando(false)
        resolve(usuarioEncontrado)
      }, 1000)
    })
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuarioLogado')
  }

  // Verificar se já está logado ao carregar a página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
    setCarregando(false)
  }, [])

  const value = {
    usuario, 
    login, 
    logout, 
    carregando
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ⭐⭐ ESTA LINHA ESTAVA FALTANDO - export correto do useAuth
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}