import { Test } from '@nestjs/testing';
import { OrderController } from '../../src/infrastructure/http/controllers/order.controller';
import { CreateOrderUseCase } from '../../src/domain/order/use-cases/create-order.use-case';
import { vi } from 'vitest';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CreateOrderUseCase,
          useValue: { execute: vi.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
  });

  it('should create an order', async () => {
    const dto = { recipientId: '1', deliverymanId: '2' };
    vi.spyOn(createOrderUseCase, 'execute').mockResolvedValue({
      id: '1',
      ...dto,
      status: 'awaiting',
      photoUrl: null,
      createdAt: new Date(),
      pickedUpAt: null,
      deliveredAt: null,
      returnedAt: null,
    });
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: '1',
      ...dto,
      status: 'awaiting',
      photoUrl: null,
      createdAt: expect.any(Date),
      pickedUpAt: null,
      deliveredAt: null,
      returnedAt: null,
    });
  });
});