variable "env" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block da VPC"
  type        = string
}

variable "subnet_cidr" {
  description = "CIDR block da subnet pública"
  type        = string
}