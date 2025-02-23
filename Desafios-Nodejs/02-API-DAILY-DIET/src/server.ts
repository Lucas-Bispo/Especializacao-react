import app from './app';
import { env } from './env';

// Inicia o servidor
app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Encerra o processo em caso de falha
  }
  console.log(`🚀 Server running on ${address}`);
});