import { Injectable } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';
import { Recipient } from '../entities/recipient.entity';
import * as crypto from 'crypto';

@Injectable()
export class CreateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(data: { name: string; cpf: string; password: string; address: string; latitude: number; longitude: number }): Promise<Recipient> {
    const recipient = new Recipient(
      crypto.randomUUID(),
      data.name,
      data.cpf,
      data.password,
      data.address,
      data.latitude,
      data.longitude,
    );
    await this.recipientRepository.create(recipient);
    return recipient;
  }
}