import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { OrderStatusChangedEvent } from '../domain-events/order-status-changed.event';

@Injectable()
export class DeliverOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, photoUrl: string, deliverymanId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'picked_up') throw new BadRequestException('Order must be picked up before delivery');
    if (order.deliverymanId !== deliverymanId) throw new ForbiddenException('Only the assigned deliveryman can deliver this order');

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

    await this.orderRepository.update(orderId, updatedOrder);
    new OrderStatusChangedEvent(orderId, updatedOrder.recipientId, updatedOrder.status);
    return updatedOrder;
  }
}