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
    return new User(
      user.id,
      user.cpf,
      user.password,
      user.role as 'admin' | 'deliveryman',
      user.name,
      user.latitude ?? undefined, // Converter null para undefined
      user.longitude ?? undefined // Converter null para undefined
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.cpf,
      user.password,
      user.role as 'admin' | 'deliveryman',
      user.name,
      user.latitude ?? undefined, // Converter null para undefined
      user.longitude ?? undefined // Converter null para undefined
    );
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
}