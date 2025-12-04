import './Graficos.css'
import { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Package, CircleDollarSign, Factory, AlertTriangle, Ellipsis } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function Graficos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      setErro(null);
      try {
        const response = await fetch(`${API_URL}/api/produtos`);
        if (!response.ok) throw new Error('Falha ao carregar dados do dashboard.');
        
        const data = await response.json();
        setProdutos(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const dashboardData = useMemo(() => {
    if (!produtos.length) return null;

    const totalItens = produtos.reduce((acc, p) => acc + (p.quantidade || 0), 0);
    const valorTotal = produtos.reduce((acc, p) => acc + ((p.preco || 0) * (p.quantidade || 0)), 0);
    const baixoEstoque = produtos.filter(p => (p.quantidade || 0) < 15).length;
    
    const fornecedoresUnicos = new Set(produtos.map(p => p.fornecedor?._id || p.fornecedor?.nome)).size;

    // Dados para Gráfico de Barras
    const dadosBarras = [...produtos]
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5)
      .map(p => ({
        name: p.nome.length > 15 ? p.nome.substring(0, 15) + '...' : p.nome,
        quantidade: p.quantidade,
        valorTotal: (p.preco * p.quantidade)
      }));

    // Dados para Gráfico de Pizza 
    const distribuicao = {};
    produtos.forEach(p => {
      const nomeFornecedor = p.fornecedor?.nome || 'Não Informado';
      distribuicao[nomeFornecedor] = (distribuicao[nomeFornecedor] || 0) + 1;
    });

    const dadosPizza = Object.keys(distribuicao).map(key => ({
      name: key,
      value: distribuicao[key]
    }));

    return {
      kpis: { totalItens, valorTotal, baixoEstoque, fornecedoresUnicos },
      graficos: { dadosBarras, dadosPizza }
    };
  }, [produtos]);

  // 4. Renderização Condicional (Loading e Erro)
  if (loading) {
    return (
      <div className="page-container">
        <div className="content-placeholder">
          <p> Carregando análises...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="page-container">
        <div className="mensagem erro">{erro}</div>
      </div>
    );
  }

  // Se não houver dados após carregar
  if (!dashboardData) {
    return (
      <div className="content-placeholder">
        <p align="center">Nenhum dado disponível para análise.</p>
      </div>
    );
  }

  const { kpis, graficos } = dashboardData;

  return (
    <div className="page-container">
      <div className="graficos-header">
        <h2>Dashboard Gerencial</h2>       
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-icon">
            <Package size={28} strokeWidth={1.5} />
          </div>
          <div className="kpi-info">
            <h3>{kpis.totalItens}</h3>
            <p>Itens em Estoque</p>
          </div>
        </div>

        <div className="kpi-card green">
          <div className="kpi-icon">
            <CircleDollarSign size={28} strokeWidth={1.5} />
          </div>
          <div className="kpi-info">
            <h3>{kpis.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
            <p>Valor Patrimonial</p>
          </div>
        </div>

        <div className="kpi-card orange">
          <div className="kpi-icon">
            <Factory size={28} strokeWidth={1.5} />
          </div>
          <div className="kpi-info">
            <h3>{kpis.fornecedoresUnicos}</h3>
            <p>Fornecedores</p>
          </div>
        </div>

        <div className="kpi-card red">
          <div className="kpi-icon">
            <AlertTriangle size={28} strokeWidth={1.5} />
          </div>
          <div className="kpi-info">
            <h3>{kpis.baixoEstoque}</h3>
            <p>Estoque Baixo</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        
        {/* Gráfico de Barras */}
        <div className="chart-wrapper">
          <h3>Top 5 Produtos (Volume)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graficos.dadosBarras} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'valorTotal' 
                    ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                    : value, 
                  name === 'valorTotal' ? 'Valor Total' : 'Quantidade'
                ]}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="quantidade" name="Unidades" fill="#4A90E2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza */}
        <div className="chart-wrapper">
          <h3> Mix por Fornecedor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={graficos.dadosPizza}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {graficos.dadosPizza.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default Graficos