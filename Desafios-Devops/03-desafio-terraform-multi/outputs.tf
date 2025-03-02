# outputs.tf
output "instance_ids" {
  value = {
    dev     = module.dev.ec2.instance_id
    staging = module.staging.ec2.instance_id
    prod    = module.prod.ec2.instance_id
  }
}