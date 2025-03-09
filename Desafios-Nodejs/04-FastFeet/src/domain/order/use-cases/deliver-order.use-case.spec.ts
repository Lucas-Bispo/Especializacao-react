import { describe, it, expect, vi } from 'vitest';
import { DeliverOrderUseCase } from './deliver-order.use-case';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

const mockOrderRepository = {
  findById: vi.fn(),
  update: vi.fn(),
};

describe('DeliverOrderUseCase', () => {
  it('should deliver an order successfully', async () => {
    const useCase = new DeliverOrderUseCase(mockOrderRepository as any);
    const order = new Order('1', 'rec1', 'del1', 'picked_up', null, new Date(), new Date(), null, null);
    mockOrderRepository.findById.mockResolvedValue(order);

    const result = await useCase.execute('1', '/uploads/test.jpg', 'del1');
    expect(result.status).toBe('delivered');
    expect(result.photoUrl).toBe('/uploads/test.jpg');
    expect(mockOrderRepository.update).toHaveBeenCalled();
  });

  it('should throw if deliveryman is not assigned', async () => {
    const useCase = new DeliverOrderUseCase(mockOrderRepository as any);
    const order = new Order('1', 'rec1', 'del1', 'picked_up', null, new Date(), new Date(), null, null);
    mockOrderRepository.findById.mockResolvedValue(order);

    await expect(useCase.execute('1', '/uploads/test.jpg', 'del2')).rejects.toThrow('Only the assigned deliveryman can deliver this order');
  });
});