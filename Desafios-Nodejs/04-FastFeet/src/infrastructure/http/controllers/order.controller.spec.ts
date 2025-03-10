import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { vi } from 'vitest';
// Supondo que tenha um OrderService
import { OrderService } from '../../../infrastructure/order/order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: { create: vi.fn() } },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should create an order', async () => {
    const dto = { recipientId: '1', description: 'Pacote' };
    vi.spyOn(orderService, 'create').mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});