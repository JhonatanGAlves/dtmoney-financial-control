import styled from "styled-components";
import { darken, transparentize } from "polished";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: var(--input-background);

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }
  
    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    color: #fff;
    background: var(--green);

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

`

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

type RadioBoxProps = {
  isActive: boolean
  activeColor: 'green' | 'red'
}

const colors = {
  green: '#40CC95',
  red: '#E52E4D'
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.isActive
    ? transparentize(0.9, colors[props.activeColor])
    : 'transparent'
  };

  transition: border-color 0.2s;

  &:hover {
    // Para escurecer a borda, não posso usar o filter, pois ele aplicaria no button todo, usando uma função
    // da lib polished, é possível chamar ela através de interpolação e passar dois parâmteros, o primeiro
    // é a intensidade do brilho e a segunda é a cor que é pra sofrer essa instensidade.
    border-color: ${darken(0.1, '#d7d7d7')};
  }
  
  img {
    width: 20px;
    height: 20px;
  }
  
  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    
    color: var(--text-title);
  }
  `