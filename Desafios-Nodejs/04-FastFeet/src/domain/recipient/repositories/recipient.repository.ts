import { Recipient } from '../entities/recipient.entity';

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract findById(id: string): Promise<Recipient | null>;
  abstract findAll(): Promise<Recipient[]>;
  abstract update(id: string, data: Partial<Recipient>): Promise<Recipient>;
  abstract delete(id: string): Promise<void>;
}