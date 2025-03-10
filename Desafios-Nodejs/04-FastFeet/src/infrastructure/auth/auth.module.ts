import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from '../http/controllers/auth.controller';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: UserRepository, useClass: PrismaUserRepository },
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}