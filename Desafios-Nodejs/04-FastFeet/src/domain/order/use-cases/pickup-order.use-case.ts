import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class PickupOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'awaiting') throw new BadRequestException('Order must be awaiting to be picked up');

    const updatedOrder = new Order(
      order.id,
      order.recipientId,
      order.deliverymanId,
      'picked_up',
      order.photoUrl,
      order.createdAt,
      new Date(), // pickedUpAt
      order.deliveredAt,
      order.returnedAt,
    );

    await this.orderRepository.update(orderId, updatedOrder);
    return updatedOrder;
  }
}