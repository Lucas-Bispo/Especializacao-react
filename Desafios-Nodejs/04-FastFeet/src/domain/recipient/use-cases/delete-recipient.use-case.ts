import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(id: string): Promise<void> {
    const recipient = await this.recipientRepository.findById(id);
    if (!recipient) throw new NotFoundException('Recipient not found');

    await this.recipientRepository.delete(id);
  }
}