import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class ListRecipientNotificationsUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(recipientId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.findByRecipientId(recipientId);
    return notifications;
  }
}