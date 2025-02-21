import { Knex } from 'knex'; // Importa o tipo Knex do módulo knex, que fornece tipos para configuração do Knex.

const config: { [key: string]: Knex.Config } = { // Define uma constante 'config' como um objeto, cujas chaves são strings e os valores são do tipo Knex.Config.
  development: { // Configuração específica para o ambiente de desenvolvimento.
    client: 'sqlite3', // Define o cliente de banco de dados a ser usado, neste caso, SQLite3.
    connection: { // Especifica os detalhes da conexão do banco de dados.
      filename: './src/database/db.sqlite', // Define o caminho para o arquivo do banco de dados SQLite.
    }, // Configuração específica para o ambiente de desenvolvimento.
    useNullAsDefault: true, // Configuração específica para o ambiente de desenvolvimento.
    migrations: { // Configurações relacionadas às migrações do banco de dados.
      directory: './src/database/migrations', // Define o diretório onde as migrações estão localizadas.
    }, // Configuração específica para o ambiente de desenvolvimento.
  }, // Configuração específica para o ambiente de desenvolvimento.
};

export default config;