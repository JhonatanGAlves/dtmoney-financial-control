import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

type HeaderProps = {
  // Propiedade abaixo é passada para o botão que está em Header, porém, para usa-lá em um component acima
  // é preciso desestruturar o HeaderProps dentro das propriedades de Header e pegar a propriedade que foi passada
  // para a função onClick do botão. Dessa forma, onde o componente Header é chamado, ele passa a esperar essa
  // propriedade desestruturada. Então é só passar essa props e jogar a função responsável por mudar o estado de
  // abrir e fechar o modal dentro dela.
  onOpenNewTransactionModal: () => void
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type='button' onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}