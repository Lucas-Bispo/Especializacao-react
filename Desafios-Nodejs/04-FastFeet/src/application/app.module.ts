import { Module } from '@nestjs/common';
import { AppConfigModule } from '../infrastructure/config/config.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserModule } from './modules/user.module';
import { OrderModule } from './modules/order.module';
import { RecipientModule } from './modules/recipient.module';
import { NotificationModule } from './modules/notification.module';

@Module({
  imports: [
    AppConfigModule,
    UserModule,
    OrderModule,
    RecipientModule,
    NotificationModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}