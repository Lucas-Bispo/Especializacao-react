import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../order/repositories/order.repository';

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(recipientId: string) {
    return this.orderRepository.findByRecipient(recipientId);
  }
}