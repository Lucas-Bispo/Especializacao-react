import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order.repository';
import { Order } from '../../order/entities/order.entity';

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(recipientId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    const recipientOrders = orders.filter((order) => order.recipientId === recipientId);
    if (!recipientOrders.length) throw new NotFoundException('No notifications found for this recipient');
    return recipientOrders;
  }
}