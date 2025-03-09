import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { NotificationRepository } from '../../notification/repositories/notification.repository';
import { Notification } from '../../notification/entities/notification.entity';

@Injectable()
export class ReturnOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(orderId: string, deliverymanId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.deliverymanId !== deliverymanId) throw new ForbiddenException('Order not assigned to this deliveryman');
    if (order.status === 'delivered' || order.status === 'returned') throw new ForbiddenException('Order cannot be returned');

    const updatedOrder = new Order(
      order.id,
      order.recipientId,
      order.deliverymanId,
      'returned',
      order.photoUrl,
      order.createdAt,
      order.pickedUpAt,
      order.deliveredAt,
      new Date(),
    );

    await this.orderRepository.update(orderId, {
      status: updatedOrder.status,
      returnedAt: updatedOrder.returnedAt,
    });

    const notification = new Notification(
      crypto.randomUUID(),
      order.recipientId,
      orderId,
      'Sua encomenda foi devolvida.',
      new Date(),
    );
    await this.notificationRepository.create(notification);

    return updatedOrder;
  }
}