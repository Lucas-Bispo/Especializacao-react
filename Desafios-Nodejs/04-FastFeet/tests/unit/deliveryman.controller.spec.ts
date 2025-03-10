import { Test } from '@nestjs/testing';
import { DeliverymanController } from '../../src/infrastructure/http/controllers/deliveryman.controller';
import { CreateDeliverymanUseCase } from '../../src/domain/user/use-cases/create-deliveryman.use-case';
import { ListDeliverymenUseCase } from '../../src/domain/user/use-cases/list-deliverymen.use-case';
import { UpdatePasswordUseCase } from '../../src/domain/user/use-cases/update-password.use-case';
import { UserRepository } from '../../src/domain/user/repositories/user.repository';
import { vi } from 'vitest';

describe('DeliverymanController', () => {
  let controller: DeliverymanController;
  let createDeliverymanUseCase: CreateDeliverymanUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DeliverymanController],
      providers: [
        { provide: CreateDeliverymanUseCase, useValue: { execute: vi.fn() } },
        { provide: ListDeliverymenUseCase, useValue: { execute: vi.fn() } },
        { provide: UpdatePasswordUseCase, useValue: { execute: vi.fn() } },
        { provide: UserRepository, useValue: { update: vi.fn(), delete: vi.fn() } },
      ],
    }).compile();

    controller = module.get<DeliverymanController>(DeliverymanController);
    createDeliverymanUseCase = module.get<CreateDeliverymanUseCase>(CreateDeliverymanUseCase);
  });

  it('should create a deliveryman', async () => {
    const dto = { cpf: '123.456.789-00', password: 'senha123', name: 'João' };
    vi.spyOn(createDeliverymanUseCase, 'execute').mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(createDeliverymanUseCase.execute).toHaveBeenCalledWith(dto);
  });
});