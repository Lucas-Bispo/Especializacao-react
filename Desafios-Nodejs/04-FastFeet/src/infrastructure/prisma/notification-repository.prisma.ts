import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationRepository } from '../../domain/notification/repositories/notification.repository';
import { Notification } from '../../domain/notification/entities/notification.entity';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        orderId: notification.orderId,
        message: notification.message,
        sentAt: notification.sentAt,
      },
    });
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
      orderBy: { sentAt: 'desc' },
    });
    return notifications.map(n => new Notification(n.id, n.recipientId, n.orderId, n.message, n.sentAt));
  }
}