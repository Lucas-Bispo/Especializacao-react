import { Module } from '@nestjs/common';
import { UserController } from '../../infrastructure/http/controllers/user.controller';
import { LoginUseCase } from '../../domain/user/use-cases/login.use-case';
import { AuthModule } from '../../infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [LoginUseCase],
})
export class UserModule {}