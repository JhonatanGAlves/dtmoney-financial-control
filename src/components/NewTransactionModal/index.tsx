import { useState, FormEvent } from "react"
import { Container, RadioBox, TransactionTypeContainer } from "./styles"
import Modal from "react-modal"
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from "../../hooks/useTransactions"

Modal.setAppElement('#root')

type NewTransactionModalProps = {
  isOpen: boolean,
  onRequestClose: () => void
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [category, setCategory] = useState('')

  const {
    createTransactions
  } = useTransactions()


  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault()

    await createTransactions({
      title,
      // Como o tipo de createTransactions não tem o estado value, é possível renomear a propriedade amount para value.
      // Porém, o ideal é transformar todos os seus estados com o mesmo nome das propriedades que vem da função.
      amount,
      type,
      category
    })

    // É preciso resetar o valor dos estados, pois sem isso, quando houver uma nova transação e o modal fechar,
    // ao abri-lo novamente, os valores dos input apareciam com os que foram preenchidos na transação.
    setTitle('')
    setAmount(0)
    setType('deposit')
    setCategory('')
    // Para que o modal seja fechado toda vez que houver uma nova transação. É preciso dizer que a função
    // handleCreateNewTransaction é async e que ela só irá ser chamada quando a função createTransactions for
    // chamada e a inserção na api acontecer. Sendo assim, passa para o proximo passo da função que é chamar
    // a função onRequestClose() ou seja, fechar o modal.
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // Estou definindo uma classe para o meu overlay, dessa forma consigo estilizar.
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}