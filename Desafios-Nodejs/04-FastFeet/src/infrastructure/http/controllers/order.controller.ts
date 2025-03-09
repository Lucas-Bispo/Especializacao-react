import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { CreateOrderUseCase } from '../../../domain/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '../../../domain/order/use-cases/list-orders.use-case';
import { UpdateOrderUseCase } from '../../../domain/order/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../../../domain/order/use-cases/delete-order.use-case';
import { PickupOrderUseCase } from '../../../domain/order/use-cases/pickup-order.use-case';
import { DeliverOrderUseCase } from '../../../domain/order/use-cases/deliver-order.use-case';
import { ReturnOrderUseCase } from '../../../domain/order/use-cases/return-order.use-case';
import { ListDeliverymanOrdersUseCase } from '../../../domain/order/use-cases/list-deliveryman-orders.use-case';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { DeliverOrderDto } from '../dtos/deliver-order.dto';
import { JwtAuthGuard } from '../../../infrastructure/auth/auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';

// Tipo para o req.user injetado pelo JwtAuthGuard
interface JwtRequest extends Request {
  user: { id: string; role: string };
}

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly pickupOrderUseCase: PickupOrderUseCase,
    private readonly deliverOrderUseCase: DeliverOrderUseCase,
    private readonly returnOrderUseCase: ReturnOrderUseCase,
    private readonly listDeliverymanOrdersUseCase: ListDeliverymanOrdersUseCase,
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

  @Put(':id/pickup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async pickup(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.pickupOrderUseCase.execute(id, req.user.id);
  }

  @Put(':id/deliver')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async deliver(@Param('id') id: string, @Body() dto: DeliverOrderDto, @Request() req: JwtRequest) {
    return this.deliverOrderUseCase.execute(id, req.user.id, dto.photoUrl);
  }

  @Put(':id/return')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async returnOrder(@Param('id') id: string, @Request() req: JwtRequest) {
    return this.returnOrderUseCase.execute(id, req.user.id);
  }
}

@Controller('deliverymen')
export class DeliverymanController {
  constructor(
    private readonly listDeliverymanOrdersUseCase: ListDeliverymanOrdersUseCase,
  ) {}

  @Get('orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('deliveryman')
  async listOrders(@Request() req: JwtRequest) {
    return this.listDeliverymanOrdersUseCase.execute(req.user.id);
  }
}