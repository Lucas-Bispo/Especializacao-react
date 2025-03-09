import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { UserRepository } from 'src/domain/user/repositories/user.repository';
//import { UserRepository } from '../../user/repositories/user.repository'; // Caminho correto

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(orderId: string, data: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');
    return this.orderRepository.update(orderId, { ...order, ...data });
  }
}