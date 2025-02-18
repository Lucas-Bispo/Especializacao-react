import fs from 'node:fs';
import { createTask } from '../controllers/TaskController.js';

export async function parseCSV(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  for (const line of lines) {
    const [title, description] = line.split(',');

    if (title && description) {
      createTask({
        body: { title: title.trim(), description: description.trim() },
      });
    }
  }
}