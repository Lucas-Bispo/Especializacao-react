import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;
    return new User(user.id, user.cpf, user.password, user.role as 'admin' | 'deliveryman', user.name, user.latitude ?? undefined, user.longitude ?? undefined);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.cpf, user.password, user.role as 'admin' | 'deliveryman', user.name, user.latitude ?? undefined, user.longitude ?? undefined);
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        cpf: user.cpf,
        password: user.password,
        role: user.role,
        name: user.name,
        latitude: user.latitude,
        longitude: user.longitude,
      },
    });
  }

  async findAllDeliverymen(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { role: 'deliveryman' } });
    return users.map(user => new User(user.id, user.cpf, user.password, user.role as 'deliveryman', user.name, user.latitude ?? undefined, user.longitude ?? undefined));
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        password: data.password,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return new User(updated.id, updated.cpf, updated.password, updated.role as 'admin' | 'deliveryman', updated.name, updated.latitude ?? undefined, updated.longitude ?? undefined);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}