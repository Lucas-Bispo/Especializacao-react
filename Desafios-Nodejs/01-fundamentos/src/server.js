// Importa o módulo 'http' para criar o servidor
import http from 'http';
// Importa a aplicação Express do módulo 'app.js'
import app from './app.js';

// Cria um servidor HTTP utilizando a aplicação Express
const server = http.createServer(app);

// Define a porta na qual o servidor irá escutar
const PORT = 3333;

// Inicia o servidor para escutar na porta especificada
server.listen(PORT, () => {
    // Loga uma mensagem no console quando o servidor está rodando
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
