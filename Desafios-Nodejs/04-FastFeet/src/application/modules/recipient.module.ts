import { Module } from '@nestjs/common';
import { RecipientController } from '../../infrastructure/http/controllers/recipient.controller';
import { CreateRecipientUseCase } from '../../domain/recipient/use-cases/create-recipient.use-case';
import { ListRecipientsUseCase } from '../../domain/recipient/use-cases/list-recipients.use-case';
import { UpdateRecipientUseCase } from '../../domain/recipient/use-cases/update-recipient.use-case';
import { DeleteRecipientUseCase } from '../../domain/recipient/use-cases/delete-recipient.use-case';
import { RecipientRepository } from '../../domain/recipient/repositories/recipient.repository';
import { PrismaRecipientRepository } from '../../infrastructure/prisma/recipient-repository.prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuthModule } from '../../infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RecipientController],
  providers: [
    CreateRecipientUseCase,
    ListRecipientsUseCase,
    UpdateRecipientUseCase,
    DeleteRecipientUseCase,
    PrismaService,
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
  ],
})
export class RecipientModule {}