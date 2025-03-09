import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;
}