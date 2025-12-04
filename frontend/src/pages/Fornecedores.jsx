import './fornecedores.css'
import { useState, useEffect } from 'react'
import { Factory } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function Fornecedores() {
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [produtosDoFornecedor, setProdutosDoFornecedor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);

  const fetchFornecedores = async () => {
    setLoading(true);
    setErro(null);
    try {
      const response = await fetch(`${API_URL}/api/fornecedores`);
      if (!response.ok) throw new Error('Não foi possível buscar os fornecedores.');
      const data = await response.json();
      setListaFornecedores(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const verProdutosFornecedor = async (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setLoading(true);
    setErro(null);
    setMensagemSucesso(null);
    try {
      const response = await fetch(`${API_URL}/api/produtos/por-fornecedor/${fornecedor._id}`);
      if (!response.ok) throw new Error('Não foi possível buscar os produtos.');
      const data = await response.json();
      setProdutosDoFornecedor(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  const voltarParaLista = () => {
    setFornecedorSelecionado(null);
    setProdutosDoFornecedor([]);
    fetchFornecedores();
  };

  const handleExcluirFornecedor = async (fornecedorId) => {
    setErro(null);
    setMensagemSucesso(null);

    if (!window.confirm("Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita.")) {
      return;
    }

    if (fornecedorSelecionado.quantidadeProdutos > 0) {
      setErro("Não é possível excluir. Este fornecedor possui produtos cadastrados.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/fornecedores/${fornecedorId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Falha ao excluir fornecedor.');
      }

      setMensagemSucesso("Fornecedor excluído com sucesso!");
      voltarParaLista();
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (erro) {
    return (
      <div className="page-container">
        <p className="mensagem erro">{erro}</p>
        {fornecedorSelecionado && (
          <button className="btn-voltar" onClick={voltarParaLista}>
            ← Voltar para Fornecedores
          </button>
        )}
      </div>
    );
  }

  if (fornecedorSelecionado) {
    return (
      <div className="page-container">
        <div className="cabecalho-fornecedor">

          <div className="cabecalho-botoes">
            <button className="btn-voltar" onClick={voltarParaLista}>
              ← Voltar para Fornecedores
            </button>

            <button
              className="btn-excluir"
              onClick={() => handleExcluirFornecedor(fornecedorSelecionado._id)}
              disabled={loading}
            >
              Deletar Fornecedor
            </button>
          </div>

          <div className="cabecalho-info-acoes">
            <p className="subtitulo">
              {fornecedorSelecionado.quantidadeProdutos}{" "}
              {fornecedorSelecionado.quantidadeProdutos === 1
                ? "produto cadastrado"
                : "produtos cadastrados"}
            </p>
          </div>

          <div className="cabecalho-titulo">
            <h2>Produtos de {fornecedorSelecionado.nome}</h2>
          </div>

        </div>

        {loading ? (
          <div className="content-placeholder"><p>Carregando produtos...</p></div>
        ) : produtosDoFornecedor.length === 0 ? (
          <div className="content-placeholder">
            <p>Nenhum produto deste fornecedor em estoque</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="produtos-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome do Produto</th>
                  <th>Quantidade</th>
                  <th>Preço (R$)</th>
                </tr>
              </thead>
              <tbody>
                {produtosDoFornecedor.map(produto => (
                  <tr key={produto._id}>
                    <td><strong>{produto.codigo}</strong></td>
                    <td>{produto.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Fornecedores</h2>

      {mensagemSucesso && (
        <div className="mensagem sucesso">{mensagemSucesso}</div>
      )}

      {loading ? (
        <div className="content-placeholder"><p>Carregando fornecedores...</p></div>
      ) : listaFornecedores.length === 0 ? (
        <div className="content-placeholder">
          <p>Nenhum fornecedor cadastrado ainda</p>
          <p><Factory/> Cadastre um fornecedor na página "Cadastrar"</p>
        </div>
      ) : (
        <div className="fornecedores-grid">
          {listaFornecedores.map(fornecedor => (
            <div
              key={fornecedor._id}
              className="card-fornecedor"
              onClick={() => verProdutosFornecedor(fornecedor)}
            >
              <div className="fornecedor-info">
                <h3>{fornecedor.nome}</h3>
                <p className="quantidade-produtos">
                  {fornecedor.quantidadeProdutos}{" "}
                  {fornecedor.quantidadeProdutos === 1 ? 'produto' : 'produtos'}
                </p>
                <p className="ver-produtos">Clique para ver produtos →</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Fornecedores;
