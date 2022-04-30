import { Container } from "./styles"
import Modal from "react-modal"

Modal.setAppElement('#root')

type NewTransactionModalProps = {
  isOpen: boolean,
  onRequestClose: () => void
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <h2>Cadastrar Transação</h2>
      </Modal>
    </Container>
  )
}