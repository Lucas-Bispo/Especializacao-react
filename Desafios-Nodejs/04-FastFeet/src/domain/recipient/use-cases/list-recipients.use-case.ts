import { Injectable } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient.repository';
import { Recipient } from '../entities/recipient.entity';

@Injectable()
export class ListRecipientsUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(): Promise<Recipient[]> {
    return this.recipientRepository.findAll();
  }
}