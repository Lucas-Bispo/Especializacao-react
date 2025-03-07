import express from 'express';
import 'dotenv/config';
import { authRoutes } from './routes/auth.ts';
import { petRoutes } from './routes/pets.ts';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', petRoutes);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});