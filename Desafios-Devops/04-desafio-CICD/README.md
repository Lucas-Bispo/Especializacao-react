# CI/CD com AWS AppRunner

Pipeline para integração e entrega contínua em ambientes dev e prod usando GitHub Actions e AWS AppRunner.

## Pré-requisitos
- Node.js
- AWS CLI
- Terraform
- Conta no GitHub

## Configuração Local
1. Clone o repositório: `git clone <URL>`
2. Instale dependências: `cd src && npm install`
3. Rode localmente: `npm start`

## Fluxo da Pipeline
- Testes
- Deploy em Dev
- Verificação de Saúde
- Deploy em Prod