import { Injectable } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';
import { Recipient } from '../entities/recipient.entity';

@Injectable()
export class CreateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(data: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }): Promise<Recipient> {
    const recipient = new Recipient(
      crypto.randomUUID(), // Gera UUID
      data.name,
      data.address,
      data.latitude,
      data.longitude,
    );
    await this.recipientRepository.create(recipient);
    return recipient;
  }
}