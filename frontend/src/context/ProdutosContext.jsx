import { createContext, useContext, useState, useEffect } from 'react'

const ProdutosContext = createContext()

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [filtroEstoqueBaixo, setFiltroEstoqueBaixo] = useState(false)

  // ⭐ SUA URL DA API - CONFIRMADA!
  const API_URL = 'http://localhost:4000'

  // 🚀 BUSCAR PRODUTOS DO MONGODB
  const buscarProdutos = async () => {
    try {
      setCarregando(true)
      const response = await fetch(`${API_URL}/produtos`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos')
      }
      
      const produtosAPI = await response.json()
      
      // ⭐ CONVERTER _id do MongoDB para id
      const produtosConvertidos = produtosAPI.map(produto => ({
        ...produto,
        id: produto._id // MongoDB usa _id como identificador
      }))
      
      setProdutos(produtosConvertidos)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      // ⭐ FALLBACK: Se API falhar, mantém array vazio
      setProdutos([])
    } finally {
      setCarregando(false)
    }
  }

  // 🚀 ADICIONAR PRODUTO NO MONGODB
  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto)
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto')
      }

      const produtoSalvo = await response.json()
      
      // Atualizar lista local com o produto salvo no MongoDB
      setProdutos(prev => [...prev, {
        ...produtoSalvo,
        id: produtoSalvo._id // MongoDB retorna _id
      }])

      return produtoSalvo
    } catch (error) {
      console.error('Erro ao adicionar produto:', error)
      throw error
    }
  }

  // 🚀 EDITAR PRODUTO NO MONGODB
  const editarProduto = async (id, dadosAtualizados) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados)
      })

      if (!response.ok) {
        throw new Error('Erro ao editar produto')
      }

      const produtoAtualizado = await response.json()
      
      // Atualizar lista local
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produtoAtualizado, id: produtoAtualizado._id || id } : produto
      ))

      return produtoAtualizado
    } catch (error) {
      console.error('Erro ao editar produto:', error)
      throw error
    }
  }

  // 🚀 EXCLUIR PRODUTO NO MONGODB
  const excluirProduto = async (id) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir produto')
      }

      // Remover da lista local
      setProdutos(prev => prev.filter(produto => produto.id !== id))

    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      throw error
    }
  }

  // ⭐ CARREGAR PRODUTOS AO INICIAR
  useEffect(() => {
    buscarProdutos()
  }, [])

  // ⭐ FILTRAR PRODUTOS (estoque baixo)
  const toggleFiltroEstoqueBaixo = () => {
    setFiltroEstoqueBaixo(prev => !prev)
  }

  const produtosFiltrados = filtroEstoqueBaixo 
    ? produtos.filter(produto => {
        const qtd = Number(produto.quantidade)
        return !isNaN(qtd) && qtd < 10
      })
    : produtos

  return (
    <ProdutosContext.Provider value={{ 
      produtos: produtosFiltrados,
      produtosOriginais: produtos,
      adicionarProduto, 
      excluirProduto, 
      editarProduto,
      filtroEstoqueBaixo,
      toggleFiltroEstoqueBaixo,
      limparFiltroEstoqueBaixo: () => setFiltroEstoqueBaixo(false),
      carregando,
      recarregarProdutos: buscarProdutos
    }}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  const context = useContext(ProdutosContext)
  if (!context) {
    throw new Error('useProdutos deve ser usado dentro de um ProdutosProvider')
  }
  return context
}