import { Test } from '@nestjs/testing';
import { DeliverymanController } from '../../src/infrastructure/http/controllers/deliveryman.controller';
//import { CreateDeliverymanUseCase } from '../../src/domain/deliveryman/use-cases/create-deliveryman.use-case';
import { vi } from 'vitest';
import { CreateDeliverymanUseCase } from 'src/domain/user/use-cases/create-deliveryman.use-case';

describe('DeliverymanController', () => {
  let controller: DeliverymanController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeliverymanController],
      providers: [
        {
          provide: CreateDeliverymanUseCase,
          useValue: {
            execute: vi.fn().mockResolvedValue({
              id: '1',
              name: 'João',
              cpf: '123.456.789-00',
              password: 'senha123',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<DeliverymanController>(DeliverymanController);
  });

  it('should create a deliveryman', async () => {
    const dto = { name: 'João', cpf: '123.456.789-00', password: 'senha123' };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});