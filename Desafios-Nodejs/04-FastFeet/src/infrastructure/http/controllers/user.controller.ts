import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../../domain/user/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';

@Controller('sessions')
export class UserController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto.cpf, loginDto.password);
  }
}