import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { NotificationRepository } from '../../notification/repositories/notification.repository';
import { Notification } from '../../notification/entities/notification.entity';

@Injectable()
export class PickupOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(orderId: string, deliverymanId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.deliverymanId !== deliverymanId) throw new ForbiddenException('Order not assigned to this deliveryman');
    if (order.status !== 'awaiting') throw new ForbiddenException('Order cannot be picked up');

    const updatedOrder = new Order(
      order.id,
      order.recipientId,
      order.deliverymanId,
      'picked_up',
      order.photoUrl,
      order.createdAt,
      new Date(),
      order.deliveredAt,
      order.returnedAt,
    );

    await this.orderRepository.update(orderId, {
      status: updatedOrder.status,
      pickedUpAt: updatedOrder.pickedUpAt,
    });

    const notification = new Notification(
      crypto.randomUUID(),
      order.recipientId,
      orderId,
      'Sua encomenda foi retirada pelo entregador.',
      new Date(),
    );
    await this.notificationRepository.create(notification);

    return updatedOrder;
  }
}