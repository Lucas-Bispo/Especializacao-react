import { Controller, Get, Param, Put, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { OrderRepository } from '../../../domain/order/repositories/order.repository';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { PickupOrderUseCase } from '../../../domain/order/use-cases/pickup-order.use-case';
import { CreateOrderUseCase } from '../../../domain/order/use-cases/create-order.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
//import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly deliverOrderUseCase: DeliverOrderUseCase,
    private readonly pickupOrderUseCase: PickupOrderUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.orderRepository.findById(id);
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
  @UseInterceptors(FileInterceptor('photo'))
  async deliver(
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.deliverOrderUseCase.execute(id, photo);
  }
}