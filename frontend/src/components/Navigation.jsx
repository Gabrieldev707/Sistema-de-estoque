import './Navigation.css'
// 1. Importe o NavLink em vez do Link
import { NavLink } from 'react-router-dom'

// 2. Remova a prop { setPaginaAtual }
function Navigation() {
  
  // Função opcional para estilizar o link ativo
  // O NavLink vai passar ({ isActive }) para a prop 'className'
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
        </ul>
      </div>
    </nav>
  )
}

export default Navigation