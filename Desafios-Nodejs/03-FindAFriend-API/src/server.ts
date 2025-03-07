import express from 'express';
import 'dotenv/config';
import { authRoutes } from './routes/auth.ts';
import { petRoutes } from './routes/pets.ts';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', petRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});