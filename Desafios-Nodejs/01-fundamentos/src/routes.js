import { Router } from 'express';
import * as TaskController from './controllers/TaskController.js';
import multer from 'multer';
import { parseCSV } from './utils/csvParser.js';

const upload = multer({ dest: 'uploads/' });

const routes = Router();

// Criação de uma task
routes.post('/tasks', TaskController.createTask);

// Listagem de todas as tasks
routes.get('/tasks', TaskController.listTasks);

// Atualização de uma task pelo ID
routes.put('/tasks/:id', TaskController.updateTask);

// Remover uma task pelo ID
routes.delete('/tasks/:id', TaskController.deleteTask);

// Marcar uma task como completa ou não
routes.patch('/tasks/:id/complete', TaskController.toggleComplete);

// Importação de tasks via CSV
routes.post('/tasks/import', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    await parseCSV(file.path);
    return res.status(201).json({ message: 'Tasks imported successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default { routes };