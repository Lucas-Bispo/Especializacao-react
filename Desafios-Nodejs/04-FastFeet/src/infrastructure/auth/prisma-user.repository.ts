import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    if (user) {
      return new User(user.id, user.cpf, user.password, user.role as 'admin' | 'deliveryman' | 'recipient', user.name, user.latitude, user.longitude);
    }

    const recipient = await this.prisma.recipient.findUnique({ where: { cpf } });
    if (recipient) {
      return new User(recipient.id, recipient.cpf, recipient.password, 'recipient', recipient.name, recipient.latitude, recipient.longitude);
    }

    return null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) {
      return new User(user.id, user.cpf, user.password, user.role as 'admin' | 'deliveryman' | 'recipient', user.name, user.latitude, user.longitude);
    }

    const recipient = await this.prisma.recipient.findUnique({ where: { id } });
    if (recipient) {
      return new User(recipient.id, recipient.cpf, recipient.password, 'recipient', recipient.name, recipient.latitude, recipient.longitude);
    }

    return null;
  }

  async findAllDeliverymen(): Promise<User[]> {
    const deliverymen = await this.prisma.user.findMany({ where: { role: 'deliveryman' } });
    return deliverymen.map((d) =>
      new User(d.id, d.cpf, d.password, d.role as 'admin' | 'deliveryman' | 'recipient', d.name, d.latitude, d.longitude)
    );
  }

  async create(data: {
    cpf: string;
    password: string;
    name: string;
    latitude?: number | null;
    longitude?: number | null;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        cpf: data.cpf,
        password: hashedPassword,
        role: 'deliveryman',
        name: data.name,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
      },
    });
    return new User(user.id, user.cpf, user.password, user.role as 'admin' | 'deliveryman' | 'recipient', user.name, user.latitude, user.longitude);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        password: data.password,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
      },
    });
    return new User(updatedUser.id, updatedUser.cpf, updatedUser.password, updatedUser.role as 'admin' | 'deliveryman' | 'recipient', updatedUser.name, updatedUser.latitude, updatedUser.longitude);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}