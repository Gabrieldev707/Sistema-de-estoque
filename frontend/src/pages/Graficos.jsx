import './Graficos.css'
import { useProdutos } from '../context/ProdutosContext'
import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

function Graficos() {
  const { produtos } = useProdutos()
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('')

  // 🎯 Obter lista de fornecedores únicos
  const fornecedores = useMemo(() => {
    const uniqueFornecedores = [...new Set(produtos.map(p => p.fornecedor))]
    return uniqueFornecedores.sort()
  }, [produtos])

  // 🎯 Filtrar produtos por fornecedor selecionado
  const produtosFiltrados = useMemo(() => {
    if (!fornecedorSelecionado) return []
    
    return produtos
      .filter(produto => produto.fornecedor === fornecedorSelecionado)
      .sort((a, b) => b.quantidade - a.quantidade) // Ordenar por quantidade (maior primeiro)
  }, [produtos, fornecedorSelecionado])

  // 🎯 Preparar dados para o gráfico
  const dadosGrafico = useMemo(() => {
    return produtosFiltrados.map(produto => ({
      nome: produto.nome,
      quantidade: produto.quantidade,
      codigo: produto.codigo,
      cor: produto.quantidade > 20 ? '#28a745' : 
           produto.quantidade > 10 ? '#ffc107' : '#dc3545'
    }))
  }, [produtosFiltrados])

  // 🎯 Calcular totais
  const totais = useMemo(() => {
    return {
      totalProdutos: produtosFiltrados.length,
      totalEstoque: produtosFiltrados.reduce((sum, p) => sum + p.quantidade, 0),
      produtosBaixoEstoque: produtosFiltrados.filter(p => p.quantidade < 10).length
    }
  }, [produtosFiltrados])

  // 🎯 Tooltip customizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            Quantidade: <strong>{payload[0].value} unidades</strong>
          </p>
          <p className="tooltip-codigo">
            Código: {payload[0].payload.codigo}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="graficos-container">
      <div className="graficos-header">
        <h1>📊 Dashboard de Estoque</h1>
        <p>Controle visual do estoque por fornecedor</p>
      </div>

      {/* 🎯 Filtro de Fornecedor */}
      <div className="filtro-container">
        <label htmlFor="fornecedor-select">Selecionar Fornecedor:</label>
        <select
          id="fornecedor-select"
          value={fornecedorSelecionado}
          onChange={(e) => setFornecedorSelecionado(e.target.value)}
          className="fornecedor-select"
        >
          <option value="">-- Selecione um fornecedor --</option>
          {fornecedores.map(fornecedor => (
            <option key={fornecedor} value={fornecedor}>
              {fornecedor}
            </option>
          ))}
        </select>
      </div>

      {fornecedorSelecionado ? (
        <>
          {/* 📊 Cards de Estatísticas */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3>{totais.totalProdutos}</h3>
                <p>Produtos</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔢</div>
              <div className="stat-info">
                <h3>{totais.totalEstoque}</h3>
                <p>Total em Estoque</p>
              </div>
            </div>
            
            <div className="stat-card alert">
              <div className="stat-icon">⚠️</div>
              <div className="stat-info">
                <h3>{totais.produtosBaixoEstoque}</h3>
                <p>Estoque Baixo</p>
              </div>
            </div>
          </div>

          {/* 📈 Gráfico de Barras */}
          <div className="chart-container">
            <h2>Produtos de {fornecedorSelecionado}</h2>
            
            {produtosFiltrados.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={dadosGrafico}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="nome" 
                    width={140}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="quantidade" 
                    name="Quantidade em Estoque"
                    radius={[0, 4, 4, 0]}
                  >
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">
                <p>Nenhum produto encontrado para este fornecedor</p>
              </div>
            )}

            {/* 🎨 Legenda de Cores */}
            <div className="legenda-container">
              <div className="legenda-item">
                <div className="legenda-cor verde"></div>
                <span>Estoque Bom (&gt; 20 unidades)</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-cor amarelo"></div>
                <span>Estoque Médio (10-20 unidades)</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-cor vermelho"></div>
                <span>Estoque Baixo (&lt; 10 unidades)</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="selecionar-fornecedor">
          <div className="placeholder-content">
            <h2>🎯 Selecione um fornecedor</h2>
            <p>Escolha um fornecedor no filtro acima para visualizar o gráfico de estoque</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Graficos