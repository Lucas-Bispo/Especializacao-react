import { Test } from '@nestjs/testing';
import { RecipientController } from './recipient.controller';
import { vi } from 'vitest';
// Supondo que tenha um RecipientService
import { RecipientService } from '../../../infrastructure/recipient/recipient.service';

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