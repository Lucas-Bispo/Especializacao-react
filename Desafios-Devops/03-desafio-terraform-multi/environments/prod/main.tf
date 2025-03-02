# environments/prod/main.tf
module "vpc" {
  source      = "../../modules/vpc"
  env         = "prod"
  vpc_cidr    = "10.2.0.0/16"
  subnet_cidr = "10.2.1.0/24"
}

module "security" {
  source = "../../modules/security"
  env    = "prod"
  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source           = "../../modules/ec2"
  env              = "prod"
  instance_type    = "t3.large"  # Maior para prod
  subnet_id        = module.vpc.subnet_id
  security_group_id = module.security.security_group_id
}