import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateDeliverymanUseCase } from '../../../domain/user/use-cases/create-deliveryman.use-case';
import { ListDeliverymenUseCase } from '../../../domain/user/use-cases/list-deliverymen.use-case';
import { UpdatePasswordUseCase } from '../../../domain/user/use-cases/update-password.use-case';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
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
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly userRepository: UserRepository,
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

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() data: Partial<CreateDeliverymanDto>) {
    return this.userRepository.update(id, { ...data, role: 'deliveryman' });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.userRepository.delete(id);
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updatePassword(@Param('id') id: string, @Body() data: { password: string }) {
    return this.updatePasswordUseCase.execute(id, data.password);
  }
}