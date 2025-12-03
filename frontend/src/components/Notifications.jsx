import './Notifications.css'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify';

// Pega a URL da API
const API_URL = import.meta.env.VITE_API_URL;

function Notifications({ onVerAlertas }) {
  const [alertas, setAlertas] = useState([])
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false)
  const dropdownRef = useRef(null)

  // --- BUSCAR ALERTAS DO BACKEND ---
  const fetchAlertas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/produtos/baixo-estoque`);
      if (response.ok) {
        const data = await response.json();
        setAlertas(data);
        
        if (data.length > 0) {
           toast.warning(`Atenção: ${data.length} produtos com estoque crítico!`, {
             toastId: 'alerta-estoque'
           });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar notificações", error);
    }
  }

  useEffect(() => {
    fetchAlertas();
    const intervalo = setInterval(fetchAlertas, 60000);
    return () => clearInterval(intervalo);
  }, []);

  const quantidadeAlertas = alertas.length

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

  // --- AQUI ESTAVA O PROBLEMA: A FUNÇÃO EXISTIA MAS NÃO ERA USADA ---
  const handleVerAlertas = () => {
    setMostrarNotificacoes(false)
    if (onVerAlertas) onVerAlertas()
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

      {mostrarNotificacoes && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Alertas de Estoque</h3>
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
                  key={produto._id} 
                  className={`notification-item ${getNivelAlerta(produto.quantidade)}`}
                >
                  <div className="notification-icon">
                    {getIconeAlerta(produto.quantidade)}
                  </div>
                  <div className="notification-content">
                    <strong>{produto.nome}</strong>
                    <span>{produto.quantidade} unidades</span>
                    <small>Fornecedor: {produto.fornecedor?.nome || 'N/A'}</small>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* --- CORREÇÃO: ADICIONEI O RODAPÉ COM O BOTÃO AQUI --- */}
          <div className="notifications-footer" style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #eee' }}>
            <button 
                onClick={handleVerAlertas}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                }}
            >
                Ver Todo o Estoque
            </button>
          </div>
          {/* --------------------------------------------------- */}

        </div>
      )}
    </div>
  )
}

export default Notifications