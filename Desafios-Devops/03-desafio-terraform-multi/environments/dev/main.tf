# environments/dev/main.tf
module "vpc" {
  source      = "../../modules/vpc"
  env         = "dev"
  vpc_cidr    = "10.0.0.0/16"
  subnet_cidr = "10.0.1.0/24"
}

module "security" {
  source = "../../modules/security"
  env    = "dev"
  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source           = "../../modules/ec2"
  env              = "dev"
  instance_type    = "t2.micro"  # Pequena para dev
  subnet_id        = module.vpc.subnet_id
  security_group_id = module.security.security_group_id
}