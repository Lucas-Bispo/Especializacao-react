import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { NotificationRepository } from '../../notification/repositories/notification.repository';
import { Notification } from '../../notification/entities/notification.entity';

@Injectable()
export class DeliverOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(orderId: string, deliverymanId: string, photoUrl: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.deliverymanId !== deliverymanId) throw new ForbiddenException('Order not assigned to this deliveryman');
    if (order.status !== 'picked_up') throw new ForbiddenException('Order must be picked up before delivery');

    const updatedOrder = new Order(
      order.id,
      order.recipientId,
      order.deliverymanId,
      'delivered',
      photoUrl,
      order.createdAt,
      order.pickedUpAt,
      new Date(),
      order.returnedAt,
    );

    await this.orderRepository.update(orderId, {
      status: updatedOrder.status,
      photoUrl: updatedOrder.photoUrl,
      deliveredAt: updatedOrder.deliveredAt,
    });

    const notification = new Notification(
      crypto.randomUUID(),
      order.recipientId,
      orderId,
      'Sua encomenda foi entregue.',
      new Date(),
    );
    await this.notificationRepository.create(notification);

    return updatedOrder;
  }
}