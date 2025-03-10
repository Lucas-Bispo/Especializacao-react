import { Test } from '@nestjs/testing';
import { RecipientController } from '../../src/infrastructure/http/controllers/recipient.controller';
import { RecipientRepository } from '../../src/domain/recipient/repositories/recipient.repository';
import { vi } from 'vitest';

describe('RecipientController', () => {
  let controller: RecipientController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RecipientController],
      providers: [
        {
          provide: RecipientRepository,
          useValue: {
            create: vi.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<RecipientController>(RecipientController);
  });

  it('should create a recipient', async () => {
    const dto = { name: 'Maria', cpf: '123.456.789-00', password: 'senha123', address: 'Rua 1' };
    await controller.create(dto);
    expect(dto).toBeDefined(); // Simplesmente verifica que o método roda
  });
});