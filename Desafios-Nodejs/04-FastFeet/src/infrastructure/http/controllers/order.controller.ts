import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateOrderUseCase } from '../../../domain/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '../../../domain/order/use-cases/list-orders.use-case';
import { UpdateOrderUseCase } from '../../../domain/order/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../../../domain/order/use-cases/delete-order.use-case';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { JwtAuthGuard } from '../../../infrastructure/auth/auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateOrderDto) {
    return this.createOrderUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async list() {
    return this.listOrdersUseCase.execute();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.updateOrderUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.deleteOrderUseCase.execute(id);
    return { message: 'Order deleted' };
  }
}