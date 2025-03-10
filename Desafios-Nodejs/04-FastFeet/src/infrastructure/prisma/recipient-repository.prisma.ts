import { PrismaClient } from '@prisma/client';
import { Order } from 'src/domain/order/entities/order.entity';
import { Recipient } from 'src/domain/recipient/entities/recipient.entity';
import { RecipientRepository } from 'src/domain/recipient/repositories/recipient.repository';
//import { Recipient } from '../../../domain/recipient/entities/recipient.entity';
//import { RecipientRepository } from '../../../domain/recipient/repositories/recipient.repository';

export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaClient) {}
  findAll(): Promise<Recipient[]> {
    throw new Error('Method not implemented.');
  }
  findOrdersByRecipient(recipientId: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  async create(data: Recipient): Promise<void> {
    await this.prisma.recipient.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        address: data.address,
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
      },
    });
    // Não retorna nada, apenas cria
  }

  async findByCpf(cpf: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { cpf },
    });
    return recipient;
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { id },
    });
    return recipient;
  }

  async update(id: string, data: Partial<Recipient>): Promise<Recipient> {
    const recipient = await this.prisma.recipient.update({
      where: { id },
      data: {
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        address: data.address,
        latitude: data.latitude !== undefined ? (data.latitude ?? 0) : undefined,
        longitude: data.longitude !== undefined ? (data.longitude ?? 0) : undefined,
      },
    });
    return recipient;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({
      where: { id },
    });
  }
}