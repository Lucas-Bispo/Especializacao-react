import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class DeliverOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, photo: Express.Multer.File): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'picked_up') throw new BadRequestException('Order must be picked up before delivery');

    const photoUrl = `/uploads/${photo.filename}`;
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
    return updatedOrder;
  }
}