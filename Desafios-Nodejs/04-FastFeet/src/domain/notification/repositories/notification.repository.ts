import { Notification } from '../entities/notification.entity';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}