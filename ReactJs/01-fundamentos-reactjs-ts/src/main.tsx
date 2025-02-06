import React from 'react' // Importa o React, necessário para a criação de componentes React e renderização
import ReactDOM from 'react-dom/client' // Importa o ReactDOM para manipular a renderização no DOM (Document Object Model)
import { App } from './App'; // Importa o componente App, que é o principal ponto de entrada da aplicação

// Cria o ponto de montagem no DOM usando o método `createRoot`, o qual inicializa a árvore de componentes do React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> {/* Envolvem os componentes em StrictMode, que ativa verificações extras durante o desenvolvimento */}
    <App /> {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>
)
