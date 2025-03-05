variable "aws_region" {
  description = "Região da AWS para provisionar os recursos"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Nome da aplicação"
  type        = string
  default     = "my-app"
}

variable "image_identifier" {
  description = "Identificador da imagem no ECR ou ECR Public"
  type        = string
  default     = "public.ecr.aws/nginx/nginx:latest" # Substitua depois
}

variable "cpu" {
  description = "Quantidade de CPU para o AppRunner (em unidades vCPU)"
  type        = string
  default     = "1024" # 1 vCPU
}

variable "memory" {
  description = "Quantidade de memória para o AppRunner (em MB)"
  type        = string
  default     = "2048" # 2 GB
}

variable "environment" {
  description = "Ambiente (dev ou prod)"
  type        = string
}