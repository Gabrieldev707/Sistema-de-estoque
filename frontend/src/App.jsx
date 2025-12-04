import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Produtos from './pages/Produtos'
import Fornecedores from './pages/Fornecedores'
import Pesquisar from './pages/Pesquisar'
import Cadastrar from './pages/Cadastrar'
import Graficos from './pages/Graficos'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProdutosProvider } from './context/ProdutosContext'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <ProdutosProvider>
      <div className="app">
        <Header />
        <Navigation /> 
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </ProdutosProvider>
  )
}

function ProtectedRoutes() {
  const { usuario, carregando } = useAuth()

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

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <AppLayout />
}

function DonoRoutes() {
  const { usuario } = useAuth()
  
  if (usuario?.tipo !== 'dono') {
    return <Navigate to="/produtos" replace />
  }

  return <Outlet />
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />  
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Produtos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/pesquisar" element={<Pesquisar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route element={<DonoRoutes />}>
          <Route path="/graficos" element={<Graficos />} />
        </Route>
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App