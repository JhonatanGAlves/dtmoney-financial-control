import { Container } from "./styles"
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions"

export const Summary = () => {
  const {
    transactions
  } = useTransactions()

  // Percorre por toda a minha transactions através do reduce pra poder calcular um total. Passando
  // um objeto com as propriedades deposits, withdraws e total e setando os seus valores iniciais.
  // É passando um acumulator (acc) pra poder percorrer e pegar todos os deposit, withdraws e total e assim soma-los
  // separadamente, e transaction pra ter acesso as propriedades de transactions.
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      // acc.deposits == todos os valores somados ao percorrer o transactions + transaction.amount (quando houver uma
      // nova inserção).
      acc.deposits += transaction.amount
      // Se for um deposit, será somado ao total.
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      // Se for um withdraw, será subtraido de total.
      acc.total -= transaction.amount
    }

    // Se não, retorna o valor do acumulator encontrado no reduce ou o seu valor inicial se não encontrar nada.
    return acc
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}