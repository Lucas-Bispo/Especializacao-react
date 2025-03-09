import { Controller, Get, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OrderRepository } from '../../../domain/order/repositories/order.repository';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly deliverOrderUseCase: DeliverOrderUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.orderRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orderRepository.findById(id);
  }

  @Put(':id/deliver')
  @UseInterceptors(FileInterceptor('photo'))
  async deliver(
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.deliverOrderUseCase.execute(id, photo);
  }
}