variable "env" {
  description = "Ambiente"
  type        = string
}

variable "instance_type" {
  description = "Tipo de instância EC2"
  type        = string
}

variable "subnet_id" {
  description = "ID da subnet"
  type        = string
}

variable "security_group_id" {
  description = "ID do security group"
  type        = string
}