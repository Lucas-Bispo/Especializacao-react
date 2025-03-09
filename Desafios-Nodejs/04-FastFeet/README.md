# Desafio 04 - FastFeet
API para controle de encomendas da transportadora fictícia FastFeet, desenvolvida com NestJS, Prisma, e DDD.

## Funcionalidades
- Login com CPF e senha (JWT)
- CRUD de entregadores, encomendas e destinatários (restrito a admin)
- Gestão de encomendas: aguardando, retirada, entrega (com foto), devolução
- Listagem de encomendas próximas ao entregador
- Alteração de senha (admin)
- Listagem de entregas por entregador
- Notificações via console (expansível pra e-mail)

## Instalação
1. Clone o repositório
2. `npm install`
3. Configure o `.env` com `DATABASE_URL` e `JWT_SECRET`
4. `npx prisma migrate dev`
5. `npm run start:dev`

## Testes
- `npm run test`