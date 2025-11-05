import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Produtos from './pages/Produtos'
import Fornecedores from './pages/Fornecedores'
import Pesquisar from './pages/Pesquisar'
import Cadastrar from './pages/Cadastrar'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProdutosProvider } from './context/ProdutosContext'

// 1. Importe os componentes do React Router
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

// 2. Crie um "Layout" para suas páginas protegidas
// (Header, Navegação, e o "buraco" <Outlet /> onde as páginas vão entrar)
function AppLayout() {
  return (
    <ProdutosProvider>
      <div className="app">
        <Header />
        {/* ⭐ IMPORTANTE: Você precisará atualizar o Navigation! (veja passo 4) */}
        <Navigation /> 
        <main className="main-content">
          {/* <Outlet /> é o espaço onde o React Router
              vai renderizar <Produtos />, <Fornecedores />, etc. */}
          <Outlet />
        </main>
      </div>
    </ProdutosProvider>
  )
}

// 3. Crie um "Porteiro" para as Rotas Protegidas
function ProtectedRoutes() {
  const { usuario, carregando } = useAuth()

  // 3a. Reutiliza sua tela de loading
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

  // 3b. Se não estiver logado, redireciona para /login
  if (!usuario) {
    // 'replace' impede o usuário de "voltar" para a tela de login
    return <Navigate to="/login" replace />
  }

  // 3c. Se estiver logado, mostra o Layout (que por sua vez mostra o <Outlet />)
  return <AppLayout />
}

// 4. Componente principal que verifica autenticação
function AppContent() {
  // Não precisamos mais de 'useState' ou 'renderizarPagina'
  // O <Routes> faz todo o trabalho!
  return (
    <Routes>
      {/* Rota 1: A página de Login (pública) */}
      <Route path="/login" element={<Login />} />

      {/* Rota 2: O "ninho" de Rotas Protegidas */}
      {/* Todas as rotas aqui dentro passarão pelo "Porteiro" <ProtectedRoutes /> */}
      <Route element={<ProtectedRoutes />}>
        {/* Estas rotas serão renderizadas dentro do <Outlet /> do AppLayout */}
        <Route path="/" element={<Produtos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/pesquisar" element={<Pesquisar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Route>
    </Routes>
  )
}

// O App "wrapper" (que envolve) continua o mesmo
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App