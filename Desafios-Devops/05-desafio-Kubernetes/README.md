# Desafio: API e Banco de Dados no Kubernetes

Este projeto implanta uma API Node.js conectada a um PostgreSQL em um cluster Kubernetes, usando Deployments, Services, ConfigMaps, PV/PVC, probes e HPA.

## Pré-requisitos
- Docker
- Kubernetes (ex.: Minikube ou cluster gerenciado)
- kubectl

## Estrutura
- `api/`: Código da API e Dockerfile.
- `k8s/`: Manifestos Kubernetes.

## Configuração Local
1. Build da imagem da API:
   ```bash
   cd api
   docker build -t <SEU_REPOSITORIO>/k8s-api:latest .
   docker push <SEU_REPOSITORIO>/k8s-api:latest