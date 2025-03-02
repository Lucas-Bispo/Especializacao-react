# terraform-multi-env/main.tf
provider "aws" {
  region = var.aws_region
}