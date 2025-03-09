import { Module } from '@nestjs/common';
import { OrderController } from '../../infrastructure/http/controllers/order.controller';
import { DeliverymanController } from '../../infrastructure/http/controllers/order.controller';
import { CreateOrderUseCase } from '../../domain/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '../../domain/order/use-cases/list-orders.use-case';
import { UpdateOrderUseCase } from '../../domain/order/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../../domain/order/use-cases/delete-order.use-case';
import { PickupOrderUseCase } from '../../domain/order/use-cases/pickup-order.use-case';
import { DeliverOrderUseCase } from '../../domain/order/use-cases/deliver-order.use-case';
import { ReturnOrderUseCase } from '../../domain/order/use-cases/return-order.use-case';
import { ListDeliverymanOrdersUseCase } from '../../domain/order/use-cases/list-deliveryman-orders.use-case';
import { OrderRepository } from '../../domain/order/repositories/order.repository';
import { PrismaOrderRepository } from '../../infrastructure/prisma/order-repository.prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/auth/prisma-user.repository';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { PrismaRecipientRepository } from '../../infrastructure/prisma/recipient-repository.prisma';
import { NotificationRepository } from '../../domain/notification/repositories/notification.repository';
import { PrismaNotificationRepository } from '../../infrastructure/prisma/notification-repository.prisma';

@Module({
  imports: [AuthModule],
  controllers: [OrderController, DeliverymanController],
  providers: [
    CreateOrderUseCase,
    ListOrdersUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    PickupOrderUseCase,
    DeliverOrderUseCase,
    ReturnOrderUseCase,
    ListDeliverymanOrdersUseCase,
    PrismaService,
    { provide: OrderRepository, useClass: PrismaOrderRepository },
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
  ],
})
export class OrderModule {}