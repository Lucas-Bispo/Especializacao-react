import { Test } from '@nestjs/testing';
import { OrderController } from '../../src/infrastructure/http/controllers/order.controller';
import { CreateOrderUseCase } from '../../src/domain/order/use-cases/create-order.use-case';
import { vi } from 'vitest';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CreateOrderUseCase,
          useValue: {
            execute: vi.fn().mockResolvedValue({
              id: '1',
              recipientId: '1',
              deliverymanId: '2',
              status: 'awaiting',
              photoUrl: null,
              createdAt: new Date(),
              pickedUpAt: null,
              deliveredAt: null,
              returnedAt: null,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should create an order', async () => {
    const dto = { recipientId: '1', deliverymanId: '2' };
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