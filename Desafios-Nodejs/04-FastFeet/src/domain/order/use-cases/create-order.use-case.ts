import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: { recipientId: string; deliverymanId: string }): Promise<Order> {
    const order = new Order(
      Math.random().toString(36).substr(2, 9), // ID temporário
      data.recipientId,
      data.deliverymanId,
      'awaiting',
      null,
      new Date(),
      null,
      null,
      null,
    );
    await this.orderRepository.create(order);
    return order;
  }
}