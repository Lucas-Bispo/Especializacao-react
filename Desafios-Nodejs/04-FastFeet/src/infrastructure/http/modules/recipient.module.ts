import { Module } from '@nestjs/common';
import { RecipientController } from '../controllers/recipient.controller';
import { PrismaRecipientRepository } from '../../prisma/recipient-repository.prisma';
import { RecipientRepository } from '../../../domain/recipient/repositories/recipient.repository';
import { CreateRecipientUseCase } from '../../../domain/recipient/use-cases/create-recipient.use-case';
import { UpdateRecipientUseCase } from '../../../domain/recipient/use-cases/update-recipient.use-case';
import { GetRecipientNotificationsUseCase } from '../../../domain/recipient/use-cases/get-recipient-notifications.use-case';
import { OrderRepository } from '../../../domain/order/repositories/order.repository'; // Corrigido o caminho
import { PrismaOrderRepository } from '../../prisma/order-repository.prisma';

@Module({
  controllers: [RecipientController],
  providers: [
    CreateRecipientUseCase,
    UpdateRecipientUseCase,
    GetRecipientNotificationsUseCase,
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class RecipientModule {}