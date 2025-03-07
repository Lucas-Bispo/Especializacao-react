
### README.md

```markdown
# FindAFriend API

Bem-vindo à **FindAFriend API**, uma aplicação RESTful desenvolvida como parte do Desafio 03 do curso de Especialização em React da Rocketseat. Esta API permite que organizações cadastrem pets disponíveis para adoção e que usuários listem esses pets por cidade, com autenticação baseada em JWT para garantir segurança.

## Funcionalidades

A API oferece as seguintes funcionalidades principais:

1. **Autenticação de Organizações**
   - **Endpoint**: `POST /sessions`
   - **Descrição**: Autentica uma organização usando email e senha, retornando um token JWT para acesso aos endpoints protegidos.
   - **Campos**: `email` (string), `password` (string).
   - **Resposta**: `{ org: { id, name, email, ... }, token }`.

2. **Cadastro de Pets**
   - **Endpoint**: `POST /pets`
   - **Descrição**: Permite que uma organização autenticada cadastre um pet disponível para adoção.
   - **Autenticação**: Requer token JWT no header `Authorization: Bearer <token>`.
   - **Campos**: `name` (string), `description` (string, opcional), `age` (number), `size` (string), `energy` (string), `city` (string).
   - **Resposta**: Dados do pet cadastrado.

3. **Listagem de Pets por Cidade**
   - **Endpoint**: `GET /pets?city=<cidade>`
   - **Descrição**: Lista todos os pets disponíveis em uma cidade específica, com filtros opcionais.
   - **Query Params**: 
     - `city` (string, obrigatório): Cidade dos pets.
     - `age` (number, opcional): Idade do pet.
     - `size` (string, opcional): Tamanho do pet.
     - `energy` (string, opcional): Nível de energia do pet.
   - **Resposta**: Array de pets filtrados.

4. **Cadastro de Organizações (Extra)**
   - **Endpoint**: `POST /orgs` (não exigido pelo desafio, mas implementado)
   - **Descrição**: Registra uma nova organização no sistema.
   - **Campos**: `name` (string), `email` (string), `password` (string), `address` (string), `whatsapp` (string).
   - **Resposta**: Dados da organização cadastrada.

## Tecnologias Utilizadas

- **Node.js**: Runtime para execução da API.
- **Fastify**: Framework para construção de rotas e servidor.
- **Prisma**: ORM para gerenciamento do banco de dados SQLite.
- **SQLite**: Banco de dados leve para desenvolvimento.
- **Zod**: Validação de dados (usado nas rotas, a confirmar implementação).
- **Bcryptjs**: Hashing de senhas para autenticação segura.
- **JWT**: Autenticação baseada em tokens.
- **Vitest**: Framework de testes unitários, com UI para visualização gráfica.

## Pré-requisitos

Antes de rodar a aplicação, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada).
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js).

## Como Configurar e Executar

Siga os passos abaixo para configurar e rodar a API localmente:

### 1. Clonar o Repositório
```bash
git clone https://github.com/Lucas-Bispo/Especializacao-react.git
cd Especializacao-react/Desafios-Nodejs/03-FindAFriend-API
```

### 2. Instalar Dependências
Instale todas as dependências listadas no `package.json`:
```bash
npm install
```

### 3. Configurar o Banco de Dados
A API usa SQLite como banco de dados. Configure o arquivo `.env` e sincronize o schema:

1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="sua-chave-secreta-aqui" # Substitua por uma chave segura
   ```
   - `DATABASE_URL`: Aponta para o arquivo SQLite local.
   - `JWT_SECRET`: Chave secreta para geração de tokens JWT (ex.: use um valor aleatório forte como `mysecretkey123` para testes).

2. Sincronize o schema do Prisma com o banco:
   ```bash
   npx prisma db push
   ```
   - Isso cria o arquivo `dev.db` com as tabelas `Org` e `Pet`.

### 4. Rodar a Aplicação
Inicie o servidor da API:
```bash
npm run dev
```
- A API estará disponível em `http://localhost:3333`.

### 5. Executar Testes
Para rodar os testes unitários e verificar a funcionalidade:
```bash
npm run test
```
- Para visualizar os testes graficamente no navegador com Vitest UI:
  ```bash
  npx vitest --ui
  ```
  - Acesse `http://localhost:51204/__vitest__/` no navegador.

## Endpoints Disponíveis

### Autenticação
- **POST /sessions**
  - **Body**: `{ "email": "test@org.com", "password": "123456" }`
  - **Resposta**: `{ "org": { "id": "...", "email": "test@org.com", ... }, "token": "..." }`

### Cadastro de Pets
- **POST /pets**
  - **Header**: `Authorization: Bearer <token>`
  - **Body**: `{ "name": "Rex", "description": "Cão amigável", "age": 2, "size": "Médio", "energy": "Alto", "city": "São Paulo" }`
  - **Resposta**: `{ "id": "...", "name": "Rex", ... }`

### Listagem de Pets
- **GET /pets?city=São Paulo**
  - **Query Params**: `city` (obrigatório), `age`, `size`, `energy` (opcionais).
  - **Resposta**: `[{ "id": "...", "name": "Rex", "city": "São Paulo", ... }, ...]`

### Cadastro de ORGs (Extra)
- **POST /orgs**
  - **Body**: `{ "name": "Org Test", "email": "test@org.com", "password": "123456", "address": "Rua Teste, 123", "whatsapp": "123456789" }`
  - **Resposta**: `{ "id": "...", "email": "test@org.com", ... }`

## Testando com Insomnia/Postman

1. **Autenticar uma ORG**:
   - Envie um POST para `http://localhost:3333/sessions` com o body acima.
   - Copie o `token` retornado.

2. **Cadastrar um Pet**:
   - Envie um POST para `http://localhost:3333/pets` com o header `Authorization: Bearer <token>` e o body do pet.

3. **Listar Pets**:
   - Envie um GET para `http://localhost:3333/pets?city=São Paulo`.

## Estrutura do Projeto

- `src/`
  - `entities/`: Definições das entidades `Org` e `Pet`.
  - `use-cases/`: Lógica de negócios (ex.: `authenticate-org.ts`, `register-pet.ts`).
  - `repositories/`: Implementações do Prisma para acesso ao banco.
  - `routes/`: Definição dos endpoints com Fastify.
  - `server.ts`: Configuração e inicialização do servidor.
  - `prisma.test.ts`: Testes básicos do Prisma.

## Observações

- **Validação com Zod**: Certifique-se de que as rotas usam Zod para validar os dados de entrada (ex.: `city` como obrigatório em `GET /pets`).
- **Tratamento de Erros**: Os casos de uso lançam erros apropriados (ex.: "Invalid credentials"), mas verifique se as rotas retornam status HTTP adequados (ex.: 401, 400).

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorias ou correções!

---

```

### Instruções para Adicionar o README

1. **Criar o Arquivo**:
   - Na raiz do diretório `03-FindAFriend-API`, crie um arquivo chamado `README.md`.
   - Copie e cole o conteúdo acima.

2. **Ajustar Detalhes**:
   - Substitua `JWT_SECRET="sua-chave-secreta-aqui"` por um valor real no `.env` (ex.: `JWT_SECRET="mysecretkey123"`).
   - Se você implementou validação com Zod em rotas específicas, mencione isso explicitamente na seção "Tecnologias Utilizadas" ou "Endpoints Disponíveis".

3. **Commit no Repositório**:
   ```bash
   git add README.md
   git commit -m "Adiciona README com descrição da API FindAFriend"
   git push origin main
   ```

---

### Verificação Final do Desafio 03

Com base na saída dos testes (`3 passed` em `src/prisma.test.ts`) e nas correções que fizemos, parece que os requisitos principais estão atendidos:

- **Autenticação**: Testes em `authenticate-org.test.ts` devem estar passando (confirme com `npx vitest --ui`).
- **Cadastro de Pets**: Teste em `register-pet.test.ts` passou anteriormente.
- **Listagem de Pets**: Testes em `list-pets-by-city.test.ts` precisam ser validados (remova `skip` e confirme).

**Ação Final**:
- Rode todos os testes com UI para confirmar:
  ```powershell
  npx vitest --ui
  ```
- Compartilhe a saída completa ou uma captura da UI para garantir que todos os 12+ testes (dependendo do total) estão passando.

Se tudo estiver verde (✅), o Desafio 03 está concluído! Caso contrário, ajustaremos os pontos pendentes.

