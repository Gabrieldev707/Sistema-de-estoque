import './Header.css'
import Notifications from './Notifications'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  // FUNÇÃO para o botão "Ver Alertas"
  const handleVerAlertas = () => {
    localStorage.setItem('filtroEstoqueBaixo', 'true')
    navigate('/produtos')
  }

  return (
    <header className="header">
      <div className="header-container">
        <img src="/LogoDluz.png" alt="Senz Iluminação & Acabamentos" className="logo" />
        
        <div className="header-right">
          <Notifications onVerAlertas={handleVerAlertas} />
          <div className="user-info">
            <span>Olá, {usuario?.nome}</span>
            <small>{usuario?.tipo === 'dono' ? 'Dono' : '👨‍💼 Funcionário'}</small>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header