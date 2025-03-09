import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateDeliverymanUseCase } from '../../../domain/user/use-cases/create-deliveryman.use-case';
import { ListDeliverymenUseCase } from '../../../domain/user/use-cases/list-deliverymen.use-case';
//import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { CreateDeliverymanDto, createDeliverymanSchema } from '../dtos/create-deliveryman.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';

@Controller('deliverymen')
export class UserController {
  constructor(
    private readonly createDeliverymanUseCase: CreateDeliverymanUseCase,
    private readonly listDeliverymenUseCase: ListDeliverymenUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body(new ZodValidationPipe(createDeliverymanSchema)) dto: CreateDeliverymanDto) {
    return this.createDeliverymanUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async list() {
    return this.listDeliverymenUseCase.execute();
  }
}