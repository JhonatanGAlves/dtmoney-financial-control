import axios from 'axios'

// Criando uma instância, pois as propriedades passadas sempre irão se repetir.
export const api = axios.create({
  // Base da URL que sempre se repete.
  baseURL: 'http://localhost:3000/api'
})