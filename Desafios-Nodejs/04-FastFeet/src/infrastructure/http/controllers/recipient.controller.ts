import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateRecipientUseCase } from '../../../domain/recipient/use-cases/create-recipient.use-case';
import { ListRecipientsUseCase } from '../../../domain/recipient/use-cases/list-recipients.use-case';
import { UpdateRecipientUseCase } from '../../../domain/recipient/use-cases/update-recipient.use-case';
import { DeleteRecipientUseCase } from '../../../domain/recipient/use-cases/delete-recipient.use-case';
import { CreateRecipientDto } from '../dtos/create-recipient.dto';
import { UpdateRecipientDto } from '../dtos/update-recipient.dto';
import { JwtAuthGuard } from '../../../infrastructure/auth/auth.guard';
import { RolesGuard } from '../../../infrastructure/auth/roles.guard';
import { Roles } from '../../../infrastructure/auth/roles.decorator';

@Controller('recipients')
export class RecipientController {
  constructor(
    private readonly createRecipientUseCase: CreateRecipientUseCase,
    private readonly listRecipientsUseCase: ListRecipientsUseCase,
    private readonly updateRecipientUseCase: UpdateRecipientUseCase,
    private readonly deleteRecipientUseCase: DeleteRecipientUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateRecipientDto) {
    return this.createRecipientUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async list() {
    return this.listRecipientsUseCase.execute();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateRecipientDto) {
    return this.updateRecipientUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.deleteRecipientUseCase.execute(id);
    return { message: 'Recipient deleted' };
  }
}