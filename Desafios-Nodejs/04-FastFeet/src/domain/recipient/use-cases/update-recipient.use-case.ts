import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';
import { Recipient } from '../entities/recipient.entity';

@Injectable()
export class UpdateRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(id: string, data: {
    name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<Recipient> {
    const recipient = await this.recipientRepository.findById(id);
    if (!recipient) throw new NotFoundException('Recipient not found');

    const updatedRecipient = new Recipient(
      recipient.id,
      data.name || recipient.name,
      data.address || recipient.address,
      data.latitude !== undefined ? data.latitude : recipient.latitude,
      data.longitude !== undefined ? data.longitude : recipient.longitude,
    );

    await this.recipientRepository.update(id, {
      name: updatedRecipient.name,
      address: updatedRecipient.address,
      latitude: updatedRecipient.latitude,
      longitude: updatedRecipient.longitude,
    });
    return updatedRecipient;
  }
}