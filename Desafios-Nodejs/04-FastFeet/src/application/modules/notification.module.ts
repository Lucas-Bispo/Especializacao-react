import { Module } from '@nestjs/common';
import { NotificationController } from '../../infrastructure/http/controllers/notification.controller';
import { ListRecipientNotificationsUseCase } from '../../domain/notification/use-cases/list-recipient-notifications.use-case';
import { NotificationRepository } from '../../domain/notification/repositories/notification.repository';
import { PrismaNotificationRepository } from '../../infrastructure/prisma/notification-repository.prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuthModule } from '../../infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NotificationController],
  providers: [
    ListRecipientNotificationsUseCase,
    PrismaService,
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
  ],
  exports: [
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
  ],
})
export class NotificationModule {}