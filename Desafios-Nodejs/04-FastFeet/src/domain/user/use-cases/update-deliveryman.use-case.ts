import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateDeliverymanUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: {
    name?: string;
    password?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user || user.role !== 'deliveryman') throw new NotFoundException('Deliveryman not found');

    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    const updatedUser = new User(
      user.id,
      user.cpf,
      data.password || user.password,
      user.role,
      data.name || user.name,
      data.latitude !== undefined ? data.latitude : user.latitude,
      data.longitude !== undefined ? data.longitude : user.longitude,
    );

    await this.userRepository.update(id, {
      name: updatedUser.name,
      password: updatedUser.password,
      latitude: updatedUser.latitude,
      longitude: updatedUser.longitude,
    });
    return updatedUser;
  }
}