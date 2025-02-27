# Base image
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY package.json yarn.lock ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Expor a porta padrão do Vite (5173)
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]