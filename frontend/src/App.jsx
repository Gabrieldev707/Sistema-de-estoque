import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Produtos from './pages/Produtos'
import Fornecedores from './pages/Fornecedores'
import Pesquisar from './pages/Pesquisar'
import Cadastrar from './pages/Cadastrar'
import Login from './pages/Login'
import { useState, useEffect } from 'react'
import { ProdutosProvider } from './context/ProdutosContext'
import { AuthProvider, useAuth } from './context/AuthContext'

// Componente principal que verifica autenticação
function AppContent() {
  const { usuario, carregando } = useAuth()
  const [paginaAtual, setPaginaAtual] = useState('produtos')

  const renderizarPagina = () => {
    switch(paginaAtual) {
      case 'produtos':
        return <Produtos />
      case 'fornecedores':
        return <Fornecedores />
      case 'pesquisar':
        return <Pesquisar />
      case 'cadastrar':
        return <Cadastrar />
      default:
        return <Produtos />
    }
  }

  // ⭐ MOSTRA LOADING ENQUANTO VERIFICA LOGIN
  if (carregando) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Carregando...</h2>
          <p>Verificando autenticação</p>
        </div>
      </div>
    )
  }

  // Se não está logado, mostra página de login
  if (!usuario) {
    return <Login />
  }

  // Se está logado, mostra o sistema normal
  return (
    <ProdutosProvider>
      <div className="app">
        <Header />
        <Navigation setPaginaAtual={setPaginaAtual} />
        <main className="main-content">
          {renderizarPagina()}
        </main>
      </div>
    </ProdutosProvider>
  )
}

// App principal com todos os providers
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App