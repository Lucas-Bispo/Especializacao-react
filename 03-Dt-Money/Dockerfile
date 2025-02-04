# Fase de construção
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production  # Instala as dependências de produção
RUN npm ci --only=dev         # Instala as dependências de desenvolvimento (incluindo json-server)
COPY . .
RUN npm run build             # Executa o comando de build

# Fase de execução do JSON Server
FROM node:18-alpine AS json-server
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/server.json /app/server.json
EXPOSE 3333
CMD ["npx", "json-server", "server.json", "-p", "3333"]

# Fase de execução do NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]