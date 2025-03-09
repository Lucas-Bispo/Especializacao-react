import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecipientModule } from '../infrastructure/http/modules/recipient.module';
import { OrderModule } from './modules/order.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { DeliverymanController } from '../infrastructure/http/controllers/deliveryman.controller'; // Caminho corrigido
import { CreateDeliverymanUseCase } from '../domain/user/use-cases/create-deliveryman.use-case';
import { UserRepository } from '../domain/user/repositories/user.repository';
import { PrismaUserRepository } from '../infrastructure/auth/prisma-user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipientModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [DeliverymanController],
  providers: [
    PrismaService,
    CreateDeliverymanUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}