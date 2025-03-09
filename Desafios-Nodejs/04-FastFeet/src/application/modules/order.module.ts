import { Module } from '@nestjs/common';
import { OrderController } from '../../infrastructure/http/controllers/order.controller';
import { CreateOrderUseCase } from '../../domain/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '../../domain/order/use-cases/list-orders.use-case';
import { UpdateOrderUseCase } from '../../domain/order/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../../domain/order/use-cases/delete-order.use-case';
import { OrderRepository } from '../../domain/order/repositories/order.repository';
import { PrismaOrderRepository } from '../../infrastructure/prisma/order-repository.prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/auth/prisma-user.repository';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { PrismaRecipientRepository } from '../../infrastructure/prisma/recipient-repository.prisma';

@Module({
  imports: [AuthModule],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    ListOrdersUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    PrismaService,
    { provide: OrderRepository, useClass: PrismaOrderRepository },
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
  ],
})
export class OrderModule {}