import { Injectable } from '@nestjs/common';
 // Ajustado
import { User } from '../entities/user.entity'; // Ajustado
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateDeliverymanUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: { cpf: string; password: string; name: string; latitude?: number; longitude?: number }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User(
      crypto.randomUUID(),
      data.cpf,
      hashedPassword,
      'deliveryman',
      data.name,
      data.latitude,
      data.longitude,
    );
    await this.userRepository.create(user);
    return user;
  }
}