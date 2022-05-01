import { useEffect, useState, createContext, ReactNode, useContext } from 'react'
import { api } from '../services/api'

type TransactionsContextData = {
  transactions: Transaction[],
  // Como toda função assincrona retorna uma promessa(Promise), é preciso passar Promise<void>, quer dizer que
  // se essa função não esperasse uma resposta, ela seria somente void (retorna nada), porém, o único retorno dela
  // é uma promessa.
  createTransactions: (transaction: TransactionInput) => Promise<void>
}

type Transaction = {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

// TransactionInput está erdando todos as propriedades de Transaction, porém está omitindo as propriedades id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionsContextProps = {
  children: ReactNode
}

// A variável TransactionsContext recebe createContext que vem de React e ela inicia com um array vazio e o tipo
// dele é uma lista de Transaction.
const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

// Foi criado um component, onde esse component será usado por volta de todos os filhos do component App.
// Esse component recebe toda a requisição da api e seu estado, dessa forma, todos os components filho de App
// Passa ter acesso a variável transactions.
export const TransactionsProvider = ({ children }: TransactionsContextProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  // Função responsável por chamar a api e introduzir uma nova transação no estado transactions.
  // Ela é assincrona, ou seja, essa função só será chamada quando tiver resposta da minha api.
  const createTransactions = async (transactionInput: TransactionInput) => {
    // Quando é feito a inserção dentro do meu endpoint 'transactions', ele acaba nos retornando os valores
    // inseridos em transaction (que é a nossa tabela no banco de dados) dentro de data.
    // Então pegamos todas as resposta (data) da nossa inserção e atribuimos a variável response, sendo assim,
    // fazemos uma desestruturação em response.data pegando somente a propriedade transaction que é a nossa
    // tabela no banco de dados que contém todas as nossas transações.
    const response = await api.post('/transactions', {
      // Como não é possível inserir uma nova transação sem a data de criação, a gente pega tudo de dentro do tipo
      // TransactionInput e acrescenta createdAt: new Date() dentro de TransactionInput.
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    // E aplicando o conceito de imutabilidade, onde o valor de um estado ele nunca é alterado e sim é criado um novo
    // estado, a gente pega o setTransactions, passa os valores antigos do estado através do uso do spread (...) e 
    // "concatena" com a nova transação, no caso, transaction.
    setTransactions([...transactions, transaction])
  }

  return (
    // Foi chamado a variável TransactionsContext, que pelo fato de receber createContext, ela passou a ser
    // um objeto e dessa forma teve acesso ao Provider, Provider espera um value e foi passado transactions, é
    // nesse momento que os components filhos de App passa a ter acesso ao estado do component TransactionsProvider.

    // Foi preciso passar um children, pois pelo fato de estar retornando um objeto, ao utilizar esse component
    // por volta dos filhos de App, é preciso especificar que este component recebe conteúdo dentro.
    <TransactionsContext.Provider value={
      {
        transactions,
        createTransactions
      }
    }>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}