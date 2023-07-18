// Importa o React, ReactDOM e o componente App
import React from "react";
// Importa o ReactDOM, que é uma biblioteca JavaScript para renderizar componentes React no DOM.
import ReactDOM from "react-dom";
// Importa o componente App, que é o componente que será renderizado na página.
import { App } from "./App";

// Cria uma nova instância do ReactDOM e renderiza o componente App na raiz da página.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*// Inicia o modo estrito do React, que ajuda a detectar erros no código React.*/}
    <App />
    {/*// Renderiza o componente App na página.*/}
  </React.StrictMode>,
);
