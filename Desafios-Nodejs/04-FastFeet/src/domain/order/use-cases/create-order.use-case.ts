import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { RecipientRepository } from '../../recipient/repositories/recipient.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly recipientRepository: RecipientRepository,
  ) {}

  async execute(data: {
    recipientId: string;
    deliverymanId?: string;
  }): Promise<Order> {
    const recipient = await this.recipientRepository.findById(data.recipientId);
    if (!recipient) throw new NotFoundException('Recipient not found');

    if (data.deliverymanId) {
      const deliveryman = await this.userRepository.findById(data.deliverymanId);
      if (!deliveryman || deliveryman.role !== 'deliveryman') throw new NotFoundException('Deliveryman not found');
    }

    const order = new Order(
      crypto.randomUUID(),
      data.recipientId,
      data.deliverymanId || null,
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