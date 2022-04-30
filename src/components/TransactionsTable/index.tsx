import { useState, useEffect } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

type TransactionsTableProps = {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<TransactionsTableProps[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data))
  }, [])

  console.log({ transactions })

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>29/04/2022</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1.100</td>
            <td>Casa</td>
            <td>21/03/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}