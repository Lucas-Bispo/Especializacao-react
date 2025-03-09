import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { Recipient } from '../../domain/recipient/entities/recipient.entity';
import { Order } from '../../domain/order/entities/order.entity';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.create({
      data: {
        id: recipient.id, // Será sobrescrito pelo Prisma se não fornecido
        name: recipient.name,
        cpf: recipient.cpf,
        password: recipient.password,
        address: recipient.address,
        latitude: recipient.latitude,
        longitude: recipient.longitude,
      },
    });
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({ where: { id } });
    if (!recipient) return null;
    return new Recipient(
      recipient.id,
      recipient.name,
      recipient.cpf,
      recipient.password,
      recipient.address,
      recipient.latitude ?? undefined,
      recipient.longitude ?? undefined,
    );
  }

  async findAll(): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany();
    return recipients.map(
      r => new Recipient(r.id, r.name, r.cpf, r.password, r.address, r.latitude ?? undefined, r.longitude ?? undefined),
    );
  }

  async update(id: string, data: Partial<Recipient>): Promise<Recipient> {
    const recipient = await this.prisma.recipient.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return new Recipient(
      recipient.id,
      recipient.name,
      recipient.cpf,
      recipient.password,
      recipient.address,
      recipient.latitude ?? undefined,
      recipient.longitude ?? undefined,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({ where: { id } });
  }

  async findOrdersByRecipient(recipientId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { recipientId },
    });
    return orders.map(
      o =>
        new Order(
          o.id,
          o.recipientId,
          o.deliverymanId,
          o.status as 'awaiting' | 'picked_up' | 'delivered' | 'returned',
          o.photoUrl ?? null,
          o.createdAt,
          o.pickedUpAt ?? null,
          o.deliveredAt ?? null,
          o.returnedAt ?? null,
        ),
    );
  }
}