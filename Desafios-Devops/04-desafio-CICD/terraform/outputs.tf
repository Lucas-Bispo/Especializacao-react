output "dev_url" {
  value = aws_apprunner_service.dev.service_url
}

output "prod_url" {
  value = aws_apprunner_service.prod.service_url
}