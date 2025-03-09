import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/auth/auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { ListRecipientNotificationsUseCase } from '../../../domain/notification/use-cases/list-recipient-notifications.use-case';

interface JwtRequest extends Request {
  user: { id: string; role: string };
}

@Controller('recipients')
export class NotificationController {
  constructor(
    private readonly listRecipientNotificationsUseCase: ListRecipientNotificationsUseCase,
  ) {}

  @Get('notifications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recipient')
  async listNotifications(@Request() req: JwtRequest) {
    return this.listRecipientNotificationsUseCase.execute(req.user.id);
  }
}