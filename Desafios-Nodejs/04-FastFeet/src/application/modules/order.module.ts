import { Module } from '@nestjs/common';
import { OrderController } from '../../infrastructure/http/controllers/order.controller'; // Ajustado pra OrderController
import { PrismaOrderRepository } from '../../infrastructure/prisma/order-repository.prisma';
import { OrderRepository } from '../../domain/order/repositories/order.repository';
import { DeliverOrderUseCase } from '../../domain/order/use-cases/deliver-order.use-case';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [OrderController], // Ajustado pra OrderController
  providers: [
    DeliverOrderUseCase,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrderModule {}