# modules/ec2/main.tf
resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"  # AMI do Amazon Linux 2 (us-east-1), ajuste conforme necessário
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]
  tags = {
    Name = "${var.env}-app-instance"
  }
}