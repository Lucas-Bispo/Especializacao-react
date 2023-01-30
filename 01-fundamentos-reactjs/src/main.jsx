import React from 'react' // pacote Coração que tem funcionalidades para tudo, MOBILE, TV, WEB..
import ReactDOM from 'react-dom/client' // integração do coração com hmtl 
import { App } from './App';


ReactDOM.createRoot(document.getElementById('root')).render(// Função importada da DOM para criar o html a partir de uma raiz
  // Metodo RENDER garante a renderização da funções que retornam html ou html puro
  // tudo isso a partir do JavaScripty
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,


)
