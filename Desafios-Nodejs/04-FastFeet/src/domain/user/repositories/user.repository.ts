import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract findAllDeliverymen(): Promise<User[]>; // Novo método
  abstract update(id: string, data: Partial<User>): Promise<User>; // Novo método
  abstract delete(id: string): Promise<void>; // Novo método
}