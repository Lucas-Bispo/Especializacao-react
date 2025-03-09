import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { Recipient } from '../../domain/recipient/entities/recipient.entity';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.create({
      data: {
        id: recipient.id,
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
      recipient.latitude,
      recipient.longitude,
    );
  }

  async findAll(): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany();
    return recipients.map((r: { id: string; name: string; cpf: string; password: string; address: string; latitude: number; longitude: number }) =>
      new Recipient(r.id, r.name, r.cpf, r.password, r.address, r.latitude, r.longitude)
    );
  }

  async update(id: string, data: Partial<Recipient>): Promise<Recipient> {
    const updatedRecipient = await this.prisma.recipient.update({
      where: { id },
      data: {
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return new Recipient(
      updatedRecipient.id,
      updatedRecipient.name,
      updatedRecipient.cpf,
      updatedRecipient.password,
      updatedRecipient.address,
      updatedRecipient.latitude,
      updatedRecipient.longitude,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({ where: { id } });
  }
}