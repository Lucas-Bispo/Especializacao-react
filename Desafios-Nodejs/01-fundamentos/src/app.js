import express from 'express'; // Importa o framework Express para criar a aplicação
import bodyParser from 'body-parser'; // Importa o middleware BodyParser para lidar com requisições com corpos JSON e URL-encoded
import  routes  from './routes.js'; // Importa as rotas da aplicação


const app = express(); // Cria uma instância da aplicação Express


app.use(bodyParser.json()); // Registra o middleware BodyParser para lidar com requisições com corpos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Registra o middleware BodyParser para lidar com requisições com corpos URL-encoded


app.use(routes); // Registra as rotas da aplicação


export default { app } // Exporta a instância da aplicação para que possa ser utilizada em outros módulos

