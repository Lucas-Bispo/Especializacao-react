import { Module } from '@nestjs/common';
import { RecipientController } from '../controllers/recipient.controller';
import { RecipientRepository } from '../../../domain/recipient/repositories/recipient.repository';
import { PrismaRecipientRepository } from '../../../infrastructure/prisma/recipient-repository.prisma';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Module({
  controllers: [RecipientController],
  providers: [
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
    PrismaService,
  ],
})
export class RecipientModule {}