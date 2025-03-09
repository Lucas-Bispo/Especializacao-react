import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { Recipient } from '../../domain/recipient/entities/recipient.entity';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({ where: { id } });
    if (!recipient) return null;
    return new Recipient(recipient.id, recipient.name, recipient.address, recipient.latitude, recipient.longitude);
  }

  async create(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.create({
      data: {
        id: recipient.id,
        name: recipient.name,
        address: recipient.address,
        latitude: recipient.latitude,
        longitude: recipient.longitude,
      },
    });
  }

  async findAll(): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany();
    return recipients.map(r => new Recipient(r.id, r.name, r.address, r.latitude, r.longitude));
  }

  async update(id: string, data: Partial<Recipient>): Promise<Recipient> {
    const updated = await this.prisma.recipient.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return new Recipient(updated.id, updated.name, updated.address, updated.latitude, updated.longitude);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({ where: { id } });
  }
}