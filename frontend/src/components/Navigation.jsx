import './Navigation.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navigation() {
  const { usuario } = useAuth()

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul>    
          <li>
            <NavLink 
              to="/produtos" 
              className={getNavLinkClass}
            >
              Todos os Produtos
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/fornecedores" 
              className={getNavLinkClass}
            >
              Fornecedores
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/pesquisar" 
              className={getNavLinkClass}
            >
              Pesquisar
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/cadastrar" 
              className={getNavLinkClass}
            >
              Cadastrar
            </NavLink>
          </li>

          {/* 📊 NOVA ABA - SÓ PARA DONOS */}
          {usuario?.tipo === 'dono' && (
            <li>
              <NavLink 
                to="/graficos" 
                className={getNavLinkClass}
              >
                📊 Gráficos
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation