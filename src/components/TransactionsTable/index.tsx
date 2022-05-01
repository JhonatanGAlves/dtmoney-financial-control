import { useTransactions } from "../../hooks/useTransactions"
import { Container } from "./styles"

export const TransactionsTable = () => {
  // Através do hook useContext, eu consigo ter acesso a todo o conteúdo que está sendo passado em TransactionsContext.
  // Att: No decorrer da aula, foi criado um hook com o nome de useTransactions. Dessa forma, evita a importação
  // do useContext e o component.
  const {
    transactions
  } = useTransactions()

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
          {transactions && transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}