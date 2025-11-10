import './Notifications.css'
import { useProdutos } from '../context/ProdutosContext'
import { useState, useRef, useEffect } from 'react'

function Notifications({ onVerAlertas }) {  // ⭐ NOVO PROP
  const { produtos } = useProdutos()
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false)
  const dropdownRef = useRef(null)

  // 🚨 Calcular alertas
  const calcularAlertas = () => {
    if (!produtos || !Array.isArray(produtos)) {
      return []
    }
    
    const alertasReais = produtos.filter(produto => {
      const qtd = Number(produto.quantidade)
      return !isNaN(qtd) && qtd < 10
    })
    
    return alertasReais
  }

  const alertas = calcularAlertas()
  const quantidadeAlertas = alertas.length

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarNotificacoes(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleNotificacoes = () => {
    setMostrarNotificacoes(!mostrarNotificacoes)
  }

  const handleVerAlertas = () => {
    setMostrarNotificacoes(false) // Fecha o dropdown
    if (onVerAlertas) {
      onVerAlertas() // ⭐ Chama a função passada pelo parent
    }
  }

  const getNivelAlerta = (quantidade) => {
    const qtd = Number(quantidade)
    if (qtd === 0) return 'critico'
    if (qtd < 5) return 'alto'
    return 'medio'
  }

  const getIconeAlerta = (quantidade) => {
    const qtd = Number(quantidade)
    if (qtd === 0) return '🔴'
    if (qtd < 5) return '🟠'
    return '🟡'
  }

  return (
    <div className="notifications-container" ref={dropdownRef}>
      {/* 🔔 Ícone do Sino */}
      <button 
        className="notifications-bell"
        onClick={toggleNotificacoes}
      >
        🔔
        {quantidadeAlertas > 0 && (
          <span className="notification-badge">
            {quantidadeAlertas}
          </span>
        )}
      </button>

      {/* 📋 Dropdown de Notificações */}
      {mostrarNotificacoes && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>⚠️ Alertas de Estoque</h3>
            {quantidadeAlertas > 0 ? (
              <span className="alert-count">{quantidadeAlertas} alertas</span>
            ) : (
              <span className="no-alerts">Tudo sob controle! ✅</span>
            )}
          </div>

          <div className="notifications-list">
            {alertas.length === 0 ? (
              <div className="empty-notifications">
                <p>Nenhum alerta no momento</p>
                <span>Estoque está controlado! 🎉</span>
              </div>
            ) : (
              alertas.map(produto => (
                <div 
                  key={produto.id} 
                  className={`notification-item ${getNivelAlerta(produto.quantidade)}`}
                >
                  <div className="notification-icon">
                    {getIconeAlerta(produto.quantidade)}
                  </div>
                  <div className="notification-content">
                    <strong>{produto.nome}</strong>
                    <span>{produto.quantidade} unidades</span>
                    <small>Código: {produto.codigo}</small>
                  </div>
                </div>
              ))
            )}
          </div>

          {alertas.length > 0 && (
            <div className="notifications-footer">
              <button 
                className="view-all-btn"
                onClick={handleVerAlertas}
              >
                Ver Todos os Alertas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Notifications