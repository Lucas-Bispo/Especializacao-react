import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './modules/order.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { RecipientModule } from './modules/recipient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipientModule,
    OrderModule,
    AuthModule,
  ],
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ],
  exports: [PrismaService], // Exporta o PrismaService pra outros módulos
})
export class AppModule {}