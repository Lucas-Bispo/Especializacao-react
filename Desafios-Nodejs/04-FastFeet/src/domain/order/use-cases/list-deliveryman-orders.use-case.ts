import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class ListDeliverymanOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(deliverymanId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders.filter(order => order.deliverymanId === deliverymanId);
  }
}