import { Test } from '@nestjs/testing';
import { RecipientController } from '../../src/infrastructure/http/controllers/recipient.controller';
import { vi } from 'vitest';
import { RecipientService } from '../../src/infrastructure/recipient/recipient.service'; // Ajuste se existir

describe('RecipientController', () => {
  let controller: RecipientController;
  let recipientService: RecipientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RecipientController],
      providers: [
        { provide: RecipientService, useValue: { create: vi.fn() } },
      ],
    }).compile();

    controller = module.get<RecipientController>(RecipientController);
    recipientService = module.get<RecipientService>(RecipientService);
  });

  it('should create a recipient', async () => {
    const dto = { name: 'Maria', address: 'Rua 1' };
    vi.spyOn(recipientService, 'create').mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});