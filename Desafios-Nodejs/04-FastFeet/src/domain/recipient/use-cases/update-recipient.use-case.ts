import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';
import { Recipient } from '../entities/recipient.entity';

@Injectable()
export class UpdateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(id: string, data: Partial<Recipient>): Promise<Recipient> {
    const recipient = await this.recipientRepository.findById(id);
    if (!recipient) throw new NotFoundException('Recipient not found');

    const updatedRecipient = new Recipient(
      recipient.id,
      data.name !== undefined ? data.name : recipient.name,
      data.cpf !== undefined ? data.cpf : recipient.cpf,
      data.password !== undefined ? data.password : recipient.password,
      data.address !== undefined ? data.address : recipient.address,
      data.latitude !== undefined ? data.latitude : recipient.latitude,
      data.longitude !== undefined ? data.longitude : recipient.longitude,
    );

    await this.recipientRepository.update(id, updatedRecipient);
    return updatedRecipient;
  }
}