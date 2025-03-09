import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAllDeliverymen(): Promise<User[]>;
  abstract create(data: {
    cpf: string;
    password: string;
    name: string;
    latitude?: number | null;
    longitude?: number | null;
  }): Promise<User>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;
}