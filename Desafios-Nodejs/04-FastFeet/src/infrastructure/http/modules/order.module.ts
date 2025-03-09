import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { PrismaOrderRepository } from '../../prisma/order-repository.prisma';
import { OrderRepository } from '../../../domain/order/repositories/order.repository';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Pasta onde as fotos serão salvas
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [OrderController],
  providers: [
    DeliverOrderUseCase,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrderModule {}