import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { RecipientRepository } from '../../recipient/repositories/recipient.repository';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly recipientRepository: RecipientRepository,
  ) {}

  async execute(id: string, data: {
    recipientId?: string;
    deliverymanId?: string | null;
    status?: 'awaiting' | 'picked_up' | 'delivered' | 'returned';
    photoUrl?: string | null;
  }): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');

    if (data.recipientId && data.recipientId !== order.recipientId) {
      const recipient = await this.recipientRepository.findById(data.recipientId);
      if (!recipient) throw new NotFoundException('Recipient not found');
    }

    if (data.deliverymanId && data.deliverymanId !== order.deliverymanId) {
      const deliveryman = await this.userRepository.findById(data.deliverymanId);
      if (!deliveryman || deliveryman.role !== 'deliveryman') throw new NotFoundException('Deliveryman not found');
    }

    const updatedOrder = new Order(
      order.id,
      data.recipientId || order.recipientId,
      data.deliverymanId !== undefined ? data.deliverymanId : order.deliverymanId,
      data.status || order.status,
      data.photoUrl !== undefined ? data.photoUrl : order.photoUrl,
      order.createdAt,
      data.status === 'picked_up' && !order.pickedUpAt ? new Date() : order.pickedUpAt,
      data.status === 'delivered' && !order.deliveredAt ? new Date() : order.deliveredAt,
      data.status === 'returned' && !order.returnedAt ? new Date() : order.returnedAt,
    );

    await this.orderRepository.update(id, {
      recipientId: updatedOrder.recipientId,
      deliverymanId: updatedOrder.deliverymanId,
      status: updatedOrder.status,
      photoUrl: updatedOrder.photoUrl,
      pickedUpAt: updatedOrder.pickedUpAt,
      deliveredAt: updatedOrder.deliveredAt,
      returnedAt: updatedOrder.returnedAt,
    });
    return updatedOrder;
  }
}