import { Module } from '@nestjs/common';
import { UserController } from '../../infrastructure/http/controllers/user.controller';
import { CreateDeliverymanUseCase } from '../../domain/user/use-cases/create-deliveryman.use-case';
import { ListDeliverymenUseCase } from '../../domain/user/use-cases/list-deliverymen.use-case';
import { UpdatePasswordUseCase } from '../../domain/user/use-cases/update-password.use-case';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/auth/prisma-user.repository';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateDeliverymanUseCase,
    ListDeliverymenUseCase,
    UpdatePasswordUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}