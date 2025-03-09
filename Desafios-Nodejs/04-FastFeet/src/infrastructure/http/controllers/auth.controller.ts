import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: { cpf: string; password: string }) {
    return this.authService.login(data.cpf, data.password);
  }
}