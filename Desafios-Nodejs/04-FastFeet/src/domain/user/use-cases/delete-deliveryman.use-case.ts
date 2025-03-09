import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteDeliverymanUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user || user.role !== 'deliveryman') throw new NotFoundException('Deliveryman not found');

    await this.userRepository.delete(id);
  }
}