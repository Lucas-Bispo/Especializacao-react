# terraform-multi-env/variables.tf

variable "aws_region" {
  description = "Região da AWS onde os recursos serão criados"
  type        = string
  default     = "us-east-1"  # Valor padrão, pode ser sobrescrito
}

variable "env" {
  description = "Nome do ambiente (dev, staging, prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "Bloco CIDR da VPC"
  type        = string
}

variable "subnet_cidr" {
  description = "Bloco CIDR da subnet pública"
  type        = string
}

variable "instance_type" {
  description = "Tipo de instância EC2 para o ambiente"
  type        = string
}

variable "ami_id" {
  description = "ID da AMI usada para as instâncias EC2"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 em us-east-1, ajuste conforme necessário
}