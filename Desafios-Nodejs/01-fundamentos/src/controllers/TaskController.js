// Define um array vazio para armazenar as tasks
let task = [];

// Função para gerar um ID único
function generateUniqueID() {
    // Gera um número aleatório, converte para base 36 (alfanumérico) e pega uma substring
    // para criar um ID único de 7 caracteres
    return Math.random().toString(36).substring(2, 9);
}

// Criacao de uma task
export function createTask(req, res) {
    // Extrai os dados de title e description do corpo da requisi o
    const { title, description } = req.body;

    // Verifica se os campos title e description foram informados
    // Se n o foram, retorna um erro 400 (Bad Request) com uma mensagem de erro
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }


    // Cria um novo objeto que representa a task a ser criada
    // com os campos id, title, description, completed_at, created_at e updated_at
    const newTask = {
        id: generateUniqueID(), // Gera um ID único para a task
        title, // Recebe o título da task
        description, // Recebe a descri o da task
        completed_at: null, // Inicialmente a task n o est  completa
        created_at: new Date(), // Data de cria o da task
        updated_at: new Date(), // Data de atualiza o da task
    };

    // Adiciona a nova task ao array de tasks
    tasks.push(newTask);

    // Retorna uma resposta de sucesso (201 Created) com o objeto da task criada
    return res.status(201).json(newTask);
}

// Listagem de todas as tasks
export function listTasks(req, res) {
    // Extrai os par metros de filtro da requisi o (query string)
    const { title, description } = req.query;

    // Inicializa o array de tasks filtradas com todas as tasks
    let filteredTasks = tasks;

    // Verifica se o par metro title foi informado e
    // se sim, filtra as tasks que contenham o valor de title
    if (title) {
        filteredTasks = filteredTasks.filter(task =>
          // Converte a title da task e do par metro para lowercase
          // e verifica se a title da task cont m o valor de title
          task.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    // Verifica se o par metro description foi informado e
    // se sim, filtra as tasks que contenham o valor de description
    if (description) {
        filteredTasks = filteredTasks.filter(task =>
          // Converte a description da task e do par metro para lowercase
          // e verifica se a description da task cont m o valor de description
          task.description.toLowerCase().includes(description.toLowerCase())
        );
    }

    // Retorna a lista de tasks filtradas
    return res.status(200).json(filteredTasks);
}

// Atualizacao de uma task pelo ID
export function updateTask(req, res) {
    // Extrai o par metro ID da URL da requisi o
    const { id } = req.params;
  
    // Extrai os dados de title e description do corpo da requisi o
    const { title, description } = req.body;
  
    // Encontra a task com o ID igual ao par metro ID
    // e retorna o ndice da task no array de tasks
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    // Se n o encontrou a task, retorna um erro 404 (Not Found)
    // com uma mensagem de erro
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Cria um novo objeto que representa a task atualizada
    // com os campos title, description e updated_at
    const updatedTask = { ...tasks[taskIndex] };
  
    // Se o campo title foi informado, atualiza o campo title da task
    if (title) updatedTask.title = title;
  
    // Se o campo description foi informado, atualiza o campo description da task
    if (description) updatedTask.description = description;
  
    // Atualiza a data de atualiza o da task
    updatedTask.updated_at = new Date();
  
    // Atualiza a task no array de tasks com a task atualizada
    tasks[taskIndex] = updatedTask;
  
    // Retorna a task atualizada
    return res.status(200).json(updatedTask);
  }
// Remover uma task pelo ID
export function deleteTask(req, res) {
    const { id } = req.params;
  
    // Encontra a task com o ID igual ao par metro ID
    // e retorna o ndice da task no array de tasks
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    // Se n o encontrou a task, retorna um erro 404 (Not Found)
    // com uma mensagem de erro
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Remove a task do array de tasks
    tasks.splice(taskIndex, 1);
  
    // Retorna uma resposta de sucesso (204 No Content) sem corpo
    return res.status(204).send();
  }
  
  // Marcar uma task como completa ou não
  export function toggleComplete(req, res) {
    const { id } = req.params;
  
    // Encontra a task com o ID igual ao par metro ID
    // e retorna o ndice da task no array de tasks
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    // Se n o encontrou a task, retorna um erro 404 (Not Found)
    // com uma mensagem de erro
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Cria um novo objeto que representa a task atualizada
    // com os campos title, description, completed_at e updated_at
    const updatedTask = { ...tasks[taskIndex] };
  
    // Verifica se a task j  est  completa e se n o, marca como completa
    // ou se est  completa, marca como n o completa
    updatedTask.completed_at = updatedTask.completed_at ? null : new Date();
  
    // Atualiza a data de atualiza o da task
    updatedTask.updated_at = new Date();
  
    // Atualiza a task no array de tasks com a task atualizada
    tasks[taskIndex] = updatedTask;
  
    // Retorna a task atualizada
    return res.status(200).json(updatedTask);
  }
