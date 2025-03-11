import { Test } from '@nestjs/testing';
import { DeliverymanController } from '../../src/infrastructure/http/controllers/deliveryman.controller';
import { RolesGuard } from '../../src/infrastructure/auth/roles.guard';
import { vi } from 'vitest';
import { CreateDeliverymanUseCase } from 'src/domain/user/use-cases/create-deliveryman.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ZodValidationPipe } from 'src/infrastructure/http/pipes/zod-validation.pipe';

describe('DeliverymanController', () => {
  let controller: DeliverymanController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeliverymanController],
      providers: [
        {
          provide: CreateDeliverymanUseCase,
          useValue: {
            execute: vi.fn(),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: vi.fn(() => true) }, // Mock pra passar o guard
        },
        {
          provide: RolesGuard,
          useValue: { canActivate: vi.fn(() => true) }, // Mock pra passar o guard
        },
        {
          provide: ZodValidationPipe,
          useValue: { transform: vi.fn((value) => value) }, // Mock pra passar o pipe
        },
      ],
    }).compile();

    controller = module.get<DeliverymanController>(DeliverymanController);
  });

  it('should create a deliveryman', async () => {
    const dto = { name: 'João', cpf: '123.456.789-00', password: 'senha123' };
    const mockResult = { id: '1', ...dto };
    const createDeliverymanUseCase = module.get<CreateDeliverymanUseCase>(CreateDeliverymanUseCase);
    vi.spyOn(createDeliverymanUseCase, 'execute').mockResolvedValue(mockResult);
    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
  });
});