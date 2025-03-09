import { Controller, Get, Param, Put, Post, Body, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { OrderRepository } from '../../../domain/order/repositories/order.repository';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { PickupOrderUseCase } from '../../../domain/order/use-cases/pickup-order.use-case';
import { CreateOrderUseCase } from '../../../domain/order/use-cases/create-order.use-case';
import { ListNearbyOrdersUseCase } from '../../../domain/order/use-cases/list-nearby-orders.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
//import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly deliverOrderUseCase: DeliverOrderUseCase,
    private readonly pickupOrderUseCase: PickupOrderUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listNearbyOrdersUseCase: ListNearbyOrdersUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() data: { recipientId: string; deliverymanId: string }) {
    return this.createOrderUseCase.execute(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.orderRepository.findAll();
  }

  @Get(':deliverymanId/deliverymen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async findByDeliveryman(@Param('deliverymanId') deliverymanId: string) {
    return this.orderRepository.findByDeliveryman(deliverymanId);
  }

  @Get(':deliverymanId/nearby')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async listNearby(@Param('deliverymanId') deliverymanId: string) {
    return this.listNearbyOrdersUseCase.execute(deliverymanId);
  }

  @Put(':id/pickup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async pickup(@Param('id') id: string) {
    return this.pickupOrderUseCase.execute(id);
  }

  @Put(':id/deliver')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async deliver(
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
    @Req() req: any,
  ) {
    const photoUrl = `/uploads/${photo.filename}`;
    const deliverymanId = req.user.sub;
    return this.deliverOrderUseCase.execute(id, photoUrl, deliverymanId);
  }

  @Put(':id/return')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async returnOrder(@Param('id') id: string) {
    return this.orderRepository.update(id, { status: 'returned', returnedAt: new Date() });
  }
}