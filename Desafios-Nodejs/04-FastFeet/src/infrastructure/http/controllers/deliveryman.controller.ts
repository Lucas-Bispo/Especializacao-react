import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateDeliverymanUseCase } from '../../../domain/user/use-cases/create-deliveryman.use-case';

import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { CreateDeliverymanDto, createDeliverymanSchema } from '../dtos/create-deliveryman.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';

@Controller('deliverymen')
export class DeliverymanController {
  constructor(private readonly createDeliverymanUseCase: CreateDeliverymanUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body(new ZodValidationPipe(createDeliverymanSchema)) dto: CreateDeliverymanDto) {
    return this.createDeliverymanUseCase.execute(dto);
  }
}