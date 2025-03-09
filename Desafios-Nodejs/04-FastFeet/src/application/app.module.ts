import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecipientModule } from '../infrastructure/http/modules/recipient.module';
import { OrderModule } from './modules/order.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { UserModule } from './modules/user.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipientModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}