# environments/staging/main.tf
module "vpc" {
  source      = "../../modules/vpc"
  env         = "staging"
  vpc_cidr    = "10.1.0.0/16"
  subnet_cidr = "10.1.1.0/24"
}

module "security" {
  source = "../../modules/security"
  env    = "staging"
  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source           = "../../modules/ec2"
  env              = "staging"
  instance_type    = "t3.medium"  # Média para staging
  subnet_id        = module.vpc.subnet_id
  security_group_id = module.security.security_group_id
}