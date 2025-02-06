import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import moment from "moment";
import "moment/dist/locale/pt-br";

// Definindo o idioma padrão para o Moment.js como "pt-br"
moment.locale("pt-br");

// Criando a raiz do aplicativo React e renderizando o componente principal
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Modo estrito do React para checagem de erros e avisos adicionais durante o desenvolvimento
  <React.StrictMode>
    {/* Componente principal da aplicação */}
    <App />
  </React.StrictMode>
);
