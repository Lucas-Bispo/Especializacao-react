import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ListDeliverymenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    // Filtrar apenas entregadores
    const users = await this.prisma.user.findMany({ where: { role: 'deliveryman' } });
    return users.map(user => new User(user.id, user.cpf, user.password, user.role as 'deliveryman', user.name, user.latitude, user.longitude));
  }
}