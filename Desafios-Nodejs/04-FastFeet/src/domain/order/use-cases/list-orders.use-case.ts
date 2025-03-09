import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}