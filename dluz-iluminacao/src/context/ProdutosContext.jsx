import { createContext, useContext, useState } from 'react'

const ProdutosContext = createContext()

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      codigo: "LMP-LED-001",
      nome: "Lâmpada LED 9W",
      fornecedor: "Luz & Cia",
      quantidade: 50,
      preco: 12.90
    },
    {
      id: 2, 
      codigo: "LST-CRISTAL-002",
      nome: "Lustre de Cristal",
      fornecedor: "Ilumina Brasil",
      quantidade: 15,
      preco: 299.90
    }
  ])

  const adicionarProduto = (novoProduto) => {
    const produtoComId = {
      ...novoProduto,
      id: Date.now()
    }
    setProdutos(prev => [...prev, produtoComId])
  }

  const excluirProduto = (id) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id))
  }

  // ⭐ NOVA FUNÇÃO: EDITAR PRODUTO
  const editarProduto = (id, dadosAtualizados) => {
    setProdutos(prev => prev.map(produto => 
      produto.id === id ? { ...produto, ...dadosAtualizados } : produto
    ))
  }

  return (
    <ProdutosContext.Provider value={{ 
      produtos, 
      adicionarProduto, 
      excluirProduto, 
      editarProduto 
    }}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  return useContext(ProdutosContext)
}