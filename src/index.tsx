import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  // Model seria o banco de dados do miragejs, ou seja, foi criado uma propriedade models, onde a primeira
  // "tabela" seria transactions e ela é do tipo Model, ou seja, um banco de dados.
  models: {
    transaction: Model
  },

  // É umna função responsavel por pré carregar dados fakes dentro da tabela (transaction) do nosso
  // banco de dados (schema).
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-04-29 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-04-18 13:23:34')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api' // Ta dizendo que todas as chamadas que fizer para API, estara a partir desse nome 'api'.

    // Ou seja, quando houver uma requisição do tipo get, vai buscar pelo endpoint api/transactions e retornar algo.
    // No caso, uma lista de objetos.
    this.get('/transactions', () => {
      // Está pegando tudo da minha tabela transactions que está no meu banco de dados (schema).
      return this.schema.all('transaction')
    })

    // request por padrão envia string, então como eu quero que seja enviado algo como JSON, é preciso parsear
    // o request.requestBody para o formato JSON.
    this.post('/transactions', (schema, request) => {
      // Pegou os valores da requisição.
      const data = JSON.parse(request.requestBody)

      // Retornou os valores da requisição. O schema seria o banco de dados, então esta passando dados
      // que seria o data para dentro da tabela transactions.
      return schema.create('transaction', data)
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
