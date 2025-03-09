import { Injectable, NotFoundException } from '@nestjs/common';
//import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/domain/user/repositories/user.repository';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}