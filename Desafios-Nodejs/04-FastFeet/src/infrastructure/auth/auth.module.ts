import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma-user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [AuthService, UserRepository], // Exportar UserRepository
})
export class AuthModule {}