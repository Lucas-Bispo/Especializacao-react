import fs from 'node:fs/promises' // importa o modulo de leitura de arquivos do node
const databasePath = new URL('../db.json', import.meta.url) // define o caminho do arquivo de banco de dados

export class Database { // define a classe Database
  #database = {} // define a propriedade privada database como um objeto vazio

  constructor() { // define o construtor da classe
    fs.readFile(databasePath, 'utf8') // lê o arquivo de banco de dados
      .then(data => { // se a leitura for bem sucedida
        this.#database = JSON.parse(data) // converte o conteúdo do arquivo para um objeto
      })
      .catch(() => { // se a leitura falhar
        this.#persist() // chama o método persist para criar o arquivo de banco de dados
      })
  }

  #persist() { // define o método persist como privado
    fs.writeFile(databasePath, JSON.stringify(this.#database)) // escreve o conteúdo da propriedade database no arquivo de banco de dados
  }

  select(table) { // define o método select
    const data = this.#database[table] ?? [] // retorna o conteúdo da tabela especificada, se existir, ou um array vazio se não existir

    return data // retorna o resultado
  }

  insert(table, data) { // define o método insert
    if (Array.isArray(this.#database[table])) { // verifica se a tabela especificada existe e é um array
      this.#database[table].push(data) // adiciona o dado na tabela
    } else {
      this.#database[table] = [data] // cria a tabela com o dado
    }

    this.#persist() // chama o método persist para atualizar o arquivo de banco de dados
    return data // retorna o dado inserido
  }
}
