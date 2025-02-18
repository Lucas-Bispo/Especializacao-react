// Define um array vazio para armazenar as tasks
let tasks = [];

// Função para gerar um ID único
function generateUniqueID() {
    // Gera um número aleatório, converte para base 36 (alfanumérico) e pega uma substring
    // para criar um ID único de 7 caracteres
    return Math.random().toString(36).substring(2, 9);
}

// Criação de uma task
export function createTask(req, res) {
    // Extrai os dados de title e description do corpo da requisição
    const { title, description } = req.body;

    // Verifica se os campos title e description foram informados
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    // Cria um novo objeto que representa a task a ser criada
    const newTask = {
        id: generateUniqueID(), // Gera um ID único para a task
        title, // Recebe o título da task
        description, // Recebe a descrição da task
        completed_at: null, // Inicialmente a task não está completa
        created_at: new Date(), // Data de criação da task
        updated_at: new Date(), // Data de atualização da task
    };

    // Adiciona a nova task ao array de tasks
    tasks.push(newTask);

    // Retorna uma resposta de sucesso (201 Created) com o objeto da task criada
    return res.status(201).json(newTask);
}

// Listagem de todas as tasks
export function listTasks(req, res) {
    // Extrai os parâmetros de filtro da requisição (query string)
    const { title, description } = req.query;

    // Inicializa o array de tasks filtradas com todas as tasks
    let filteredTasks = tasks;

    // Filtra por title, se informado
    if (title) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    // Filtra por description, se informado
    if (description) {
        filteredTasks = filteredTasks.filter(task =>
            task.description.toLowerCase().includes(description.toLowerCase())
        );
    }

    // Retorna a lista de tasks filtradas
    return res.status(200).json(filteredTasks);
}

// Atualização de uma task pelo ID
export function updateTask(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    // Encontra a task com o ID igual ao parâmetro ID
    const taskIndex = tasks.findIndex(task => task.id === id);

    // Se não encontrou a task, retorna um erro 404 (Not Found)
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Cria um novo objeto que representa a task atualizada
    const updatedTask = { ...tasks[taskIndex] };

    // Atualiza os campos title e description, se informados
    if (title) updatedTask.title = title;
    if (description) updatedTask.description = description;

    // Atualiza a data de atualização da task
    updatedTask.updated_at = new Date();

    // Atualiza a task no array de tasks
    tasks[taskIndex] = updatedTask;

    // Retorna a task atualizada
    return res.status(200).json(updatedTask);
}

// Remover uma task pelo ID
export function deleteTask(req, res) {
    const { id } = req.params;

    // Encontra a task com o ID igual ao parâmetro ID
    const taskIndex = tasks.findIndex(task => task.id === id);

    // Se não encontrou a task, retorna um erro 404 (Not Found)
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

    // Encontra a task com o ID igual ao parâmetro ID
    const taskIndex = tasks.findIndex(task => task.id === id);

    // Se não encontrou a task, retorna um erro 404 (Not Found)
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Cria um novo objeto que representa a task atualizada
    const updatedTask = { ...tasks[taskIndex] };

    // Alterna o estado de completed_at
    updatedTask.completed_at = updatedTask.completed_at ? null : new Date();

    // Atualiza a data de atualização da task
    updatedTask.updated_at = new Date();

    // Atualiza a task no array de tasks
    tasks[taskIndex] = updatedTask;

    // Retorna a task atualizada
    return res.status(200).json(updatedTask);
}