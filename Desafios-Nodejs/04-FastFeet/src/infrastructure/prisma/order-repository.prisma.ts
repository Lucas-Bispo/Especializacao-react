import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderRepository } from '../../domain/order/repositories/order.repository';
import { Order } from '../../domain/order/entities/order.entity';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        id: order.id,
        recipientId: order.recipientId,
        deliverymanId: order.deliverymanId,
        status: order.status,
        photoUrl: order.photoUrl,
        createdAt: order.createdAt,
        pickedUpAt: order.pickedUpAt,
        deliveredAt: order.deliveredAt,
        returnedAt: order.returnedAt,
      },
    });
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) return null;
    return new Order(
      order.id,
      order.recipientId,
      order.deliverymanId,
      order.status as 'awaiting' | 'picked_up' | 'delivered' | 'returned',
      order.photoUrl,
      order.createdAt,
      order.pickedUpAt,
      order.deliveredAt,
      order.returnedAt,
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map((o: { id: string; recipientId: string; deliverymanId: string | null; status: 'awaiting' | 'picked_up' | 'delivered' | 'returned'; photoUrl: string | null; createdAt: Date; pickedUpAt: Date | null; deliveredAt: Date | null; returnedAt: Date | null }) =>
      new Order(
        o.id,
        o.recipientId,
        o.deliverymanId,
        o.status,
        o.photoUrl,
        o.createdAt,
        o.pickedUpAt,
        o.deliveredAt,
        o.returnedAt,
      )
    );
  }

  async findByDeliverymanId(deliverymanId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({ where: { deliverymanId } });
    return orders.map((o: { id: string; recipientId: string; deliverymanId: string | null; status: 'awaiting' | 'picked_up' | 'delivered' | 'returned'; photoUrl: string | null; createdAt: Date; pickedUpAt: Date | null; deliveredAt: Date | null; returnedAt: Date | null }) =>
      new Order(
        o.id,
        o.recipientId,
        o.deliverymanId,
        o.status,
        o.photoUrl,
        o.createdAt,
        o.pickedUpAt,
        o.deliveredAt,
        o.returnedAt,
      )
    );
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        photoUrl: data.photoUrl,
        pickedUpAt: data.pickedUpAt,
        deliveredAt: data.deliveredAt,
        returnedAt: data.returnedAt,
      },
    });
    return new Order(
      updatedOrder.id,
      updatedOrder.recipientId,
      updatedOrder.deliverymanId,
      updatedOrder.status as 'awaiting' | 'picked_up' | 'delivered' | 'returned',
      updatedOrder.photoUrl,
      updatedOrder.createdAt,
      updatedOrder.pickedUpAt,
      updatedOrder.deliveredAt,
      updatedOrder.returnedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}