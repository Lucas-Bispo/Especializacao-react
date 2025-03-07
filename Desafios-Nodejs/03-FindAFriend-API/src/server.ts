import express from 'express';
import 'dotenv/config';
import { authRoutes } from './routes/auth.js';

const app = express();

app.use(express.json()); // Permite que o Express leia corpos JSON
app.use('/auth', authRoutes); // Monta as rotas de autenticação em /auth

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/**
 * import 'dotenv/config';
import express from 'express';
import { authenticateOrgRoute } from './routes/auth'; // Exemplo de rota

const app = express();
app.use(express.json());

app.use('/auth', authenticateOrgRoute);

app.listen(3333, () => console.log('Server running on port 3333'));
 * 
 */