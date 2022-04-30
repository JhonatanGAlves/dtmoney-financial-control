import styled from 'styled-components'

export const Container = styled.header`
  background-color: var(--blue);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #FFFFFF;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s; // Um efeito de transition de 2 ms toda vez que a propriedade filter for chamada.

    &:hover {
      filter: brightness(0.9); // Pra dar uma leve escurecida no botão.
    }
  }
`