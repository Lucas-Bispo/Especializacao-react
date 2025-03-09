import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { CreateOrderUseCase } from '../../../domain/order/use-cases/create-order.use-case';
import { PickupOrderUseCase } from '../../../domain/order/use-cases/pickup-order.use-case';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { ListNearbyOrdersUseCase } from '../../../domain/order/use-cases/list-nearby-orders.use-case';
import { OrderRepository } from '../../../domain/order/repositories/order.repository';
import { PrismaOrderRepository } from '../../../infrastructure/prisma/order-repository.prisma';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from '../../../infrastructure/auth/prisma-user.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    PickupOrderUseCase,
    DeliverOrderUseCase,
    ListNearbyOrdersUseCase,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class OrderModule {}