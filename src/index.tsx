import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer } from 'miragejs'
import { App } from './App'

createServer({
  routes() {
    this.namespace = 'api' // Ta dizendo que todas as chamadas que fizer para API, estara a partir desse nome 'api'.

    // Ou seja, quando houver uma requisição do tipo get, vai buscar pelo endpoint api/transactions e retornar algo.
    // No caso, uma lista de objetos.
    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
