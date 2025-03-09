import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateDeliverymanUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: {
    cpf: string;
    password: string;
    name: string;
    latitude?: number;
    longitude?: number;
  }): Promise<User> {
    const existingUser = await this.userRepository.findByCpf(data.cpf);
    if (existingUser) throw new ConflictException('CPF already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User(
      crypto.randomUUID(), // Gera UUID
      data.cpf,
      hashedPassword,
      'deliveryman', // Role fixa como entregador
      data.name,
      data.latitude,
      data.longitude,
    );

    await this.userRepository.create(user);
    return user;
  }
}