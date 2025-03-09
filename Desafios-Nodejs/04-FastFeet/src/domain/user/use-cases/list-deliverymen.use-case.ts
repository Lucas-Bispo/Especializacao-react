import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ListDeliverymenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.filter(user => user.role === 'deliveryman');
  }
}