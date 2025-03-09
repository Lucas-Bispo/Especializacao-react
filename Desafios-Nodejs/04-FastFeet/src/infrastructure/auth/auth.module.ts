import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//import { AuthController } from '../http/controllers/auth.controller'; // Caminho correto
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
//import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma-user.repository';
import { RolesGuard } from './roles.guard';
import { UserRepository } from 'src/domain/user/repositories/user.repository';
import { AuthController } from '../http/controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}