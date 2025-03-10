import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RecipientRepository } from '../../../domain/recipient/repositories/recipient.repository';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';
import { Recipient } from '../../../domain/recipient/entities/recipient.entity';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';

@Controller('recipients')
export class RecipientController {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() data: { name: string; cpf: string; password: string; address: string; latitude?: number; longitude?: number }) {
    const recipient = new Recipient(
      Math.random().toString(36).substr(2, 9), // ID temporário, Prisma sobrescreve
      data.name,
      data.cpf,
      data.password,
      data.address,
      data.latitude !== undefined ? data.latitude : undefined, // Garante compatibilidade
      data.longitude !== undefined ? data.longitude : undefined, // Garante compatibilidade
    );
    return this.recipientRepository.create(recipient);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.recipientRepository.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findById(@Param('id') id: string) {
    return this.recipientRepository.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() data: Partial<{ name: string; address: string; latitude?: number; longitude?: number }>) {
    return this.recipientRepository.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.recipientRepository.delete(id);
  }

  @Get(':id/notifications')
  @UseGuards(JwtAuthGuard)
  async getNotifications(@Param('id') id: string) {
    return this.recipientRepository.findOrdersByRecipient(id);
  }
}