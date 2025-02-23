// Importa a aplicação do arquivo 'app.ts'
import app from './app';

// Importa as variáveis de ambiente validadas do arquivo 'env.ts'
import { env } from './env';

// Inicia o servidor com a porta definida na variável de ambiente 'PORT'
app.listen({ port: env.PORT }, (err, address) => {
  // Caso ocorra um erro durante a inicialização do servidor, 
  // imprime a mensagem de erro no console e encerra o processo
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Encerra o processo em caso de falha
  }

  // Caso o servidor seja iniciado com sucesso, imprime a mensagem no console
  console.log(`  Server running on ${address}`);
});
