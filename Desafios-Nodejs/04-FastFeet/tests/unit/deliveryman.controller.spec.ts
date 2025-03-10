import { Test } from '@nestjs/testing';
import { DeliverymanController } from '../../src/infrastructure/http/controllers/deliveryman.controller';
import { vi } from 'vitest';
import { CreateDeliverymanUseCase } from 'src/domain/user/use-cases/create-deliveryman.use-case';

describe('DeliverymanController', () => {
  let controller: DeliverymanController;
  let createDeliverymanUseCase: CreateDeliverymanUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeliverymanController],
      providers: [
        {
          provide: CreateDeliverymanUseCase,
          useValue: { execute: vi.fn() },
        },
      ],
    }).compile();

    controller = module.get<DeliverymanController>(DeliverymanController);
    createDeliverymanUseCase = module.get<CreateDeliverymanUseCase>(CreateDeliverymanUseCase);
  });

  it('should create a deliveryman', async () => {
    const dto = { name: 'João', cpf: '123.456.789-00', password: 'senha123' };
    vi.spyOn(createDeliverymanUseCase, 'execute').mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(createDeliverymanUseCase.execute).toHaveBeenCalledWith(dto);
  });
});