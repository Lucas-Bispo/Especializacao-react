import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
//import { UserRepository } from '../../domain/user/repositories/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserRepository } from 'src/domain/user/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        cpf: user.cpf,
        password: user.password,
        role: user.role,
        name: user.name,
        latitude: user.latitude ?? null,
        longitude: user.longitude ?? null,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.cpf,
      user.password,
      user.role as 'admin' | 'deliveryman' | 'recipient',
      user.name,
      user.latitude ?? undefined,
      user.longitude ?? undefined,
    );
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;
    return new User(
      user.id,
      user.cpf,
      user.password,
      user.role as 'admin' | 'deliveryman' | 'recipient',
      user.name,
      user.latitude ?? undefined,
      user.longitude ?? undefined,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user =>
      new User(
        user.id,
        user.cpf,
        user.password,
        user.role as 'admin' | 'deliveryman' | 'recipient',
        user.name,
        user.latitude ?? undefined,
        user.longitude ?? undefined,
      ),
    );
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        cpf: data.cpf,
        password: data.password,
        role: data.role,
        name: data.name,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.cpf,
      updatedUser.password,
      updatedUser.role as 'admin' | 'deliveryman' | 'recipient',
      updatedUser.name,
      updatedUser.latitude ?? undefined,
      updatedUser.longitude ?? undefined,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}