import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../../../domain/user/use-cases/login.use-case';
import { CreateDeliverymanUseCase } from '../../../domain/user/use-cases/create-deliveryman.use-case';
//import { ListDeliverymenUseCase } from '../../../domain/user/use-cases/list-deliverymen.use-case';
import { UpdateDeliverymanUseCase } from '../../../domain/user/use-cases/update-deliveryman.use-case';
import { DeleteDeliverymanUseCase } from '../../../domain/user/use-cases/delete-deliveryman.use-case';
import { LoginDto } from '../dtos/login.dto';
import { CreateDeliverymanDto } from '../dtos/create-deliveryman.dto';

import { JwtAuthGuard } from '../../../infrastructure/auth/auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { ListDeliverymenUseCase } from 'src/domain/user/use-cases/list-deliverymen.use-case';


@Controller()
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createDeliverymanUseCase: CreateDeliverymanUseCase,
    private readonly listDeliverymenUseCase: ListDeliverymenUseCase,
    private readonly updateDeliverymanUseCase: UpdateDeliverymanUseCase,
    private readonly deleteDeliverymanUseCase: DeleteDeliverymanUseCase,
  ) {}

  @Post('sessions')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto.cpf, loginDto.password);
  }

  @Post('deliverymen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createDeliveryman(@Body() dto: CreateDeliverymanDto) {
    return this.createDeliverymanUseCase.execute(dto);
  }

  @Get('deliverymen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async listDeliverymen() {
    return this.listDeliverymenUseCase.execute();
  }

  @Put('deliverymen/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateDeliveryman(@Param('id') id: string, @Body() dto: UpdateDeliverymanDto) {
    return this.updateDeliverymanUseCase.execute(id, dto);
  }

  @Delete('deliverymen/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteDeliveryman(@Param('id') id: string) {
    await this.deleteDeliverymanUseCase.execute(id);
    return { message: 'Deliveryman deleted' };
  }
}