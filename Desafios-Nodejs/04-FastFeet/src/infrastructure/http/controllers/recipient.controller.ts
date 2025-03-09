import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateRecipientUseCase } from '../../../domain/recipient/use-cases/create-recipient.use-case';
import { UpdateRecipientUseCase } from '../../../domain/recipient/use-cases/update-recipient.use-case';
import { GetRecipientNotificationsUseCase } from '../../../domain/recipient/use-cases/get-recipient-notifications.use-case';
import { RecipientRepository } from '../../../domain/recipient/repositories/recipient.repository';
import { CreateRecipientDto } from '../dtos/create-recipient.dto';

@Controller('recipients')
export class RecipientController {
  constructor(
    private readonly createRecipientUseCase: CreateRecipientUseCase,
    private readonly updateRecipientUseCase: UpdateRecipientUseCase,
    private readonly getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
    private readonly recipientRepository: RecipientRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateRecipientDto) {
    return this.createRecipientUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.recipientRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.recipientRepository.findById(id);
  }

  @Get(':id/notifications')
  async getNotifications(@Param('id') id: string) {
    return this.getRecipientNotificationsUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateRecipientDto>) {
    return this.updateRecipientUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.recipientRepository.delete(id);
  }
}