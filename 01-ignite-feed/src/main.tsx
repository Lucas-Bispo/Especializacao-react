import React from 'react' // Importa o pacote React, que fornece funcionalidades para construir interfaces de usuário.
import ReactDOM from 'react-dom/client' // Importa a integração do React com a DOM do navegador.

import { App } from './App'; // Importa o componente App do arquivo App.js.

ReactDOM.createRoot(document.getElementById('root')!).render( // Cria uma raiz para renderização do componente App no DOM do navegador.
  //* <React.StrictMode> Componente que ativa verificações extras em tempo de desenvolvimento e sinaliza o uso de recursos obsoletos.
  // <App /> Renderiza o componente App importado anteriormente.
  <React.StrictMode> 
    <App /> 
  </React.StrictMode> 
)
