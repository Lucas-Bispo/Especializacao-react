// src/infrastructure/http/controllers/deliveryman.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateDeliverymanUseCase } from '../../../domain/user/use-cases/create-deliveryman.use-case';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';


@Controller('deliverymen')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliverymanController {
  constructor(
    private readonly createDeliverymanUseCase: CreateDeliverymanUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @Roles('admin')
  async create(@Body() dto: { name: string; cpf: string; password: string }) {
    return this.createDeliverymanUseCase.execute(dto);
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.prisma.user.findMany({ where: { role: 'deliveryman' } });
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({ where: { id, role: 'deliveryman' } });
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: { name?: string; cpf?: string; password?: string }) {
    return this.prisma.user.update({ where: { id, role: 'deliveryman' }, data: dto });
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.prisma.user.delete({ where: { id, role: 'deliveryman' } });
  }
}