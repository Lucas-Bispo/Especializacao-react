import { describe, it, expect, vi } from 'vitest';
import { CreateDeliverymanUseCase } from './create-deliveryman.use-case';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

const mockUserRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findByCpf: vi.fn(),
  findAll: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('CreateDeliverymanUseCase', () => {
  it('should create a deliveryman successfully', async () => {
    const useCase = new CreateDeliverymanUseCase(mockUserRepository as any);
    const data = {
      cpf: '123.456.789-00',
      password: 'senha123',
      name: 'João',
      latitude: -23.5505,
      longitude: -46.6333,
    };

    const result = await useCase.execute(data);
    expect(result).toBeInstanceOf(User);
    expect(result.role).toBe('deliveryman');
    expect(mockUserRepository.create).toHaveBeenCalledWith(result);
  });

  it('should hash the password before creating', async () => {
    const useCase = new CreateDeliverymanUseCase(mockUserRepository as any);
    const data = {
      cpf: '987.654.321-00',
      password: 'senha456',
      name: 'Maria',
    };

    const result = await useCase.execute(data);
    expect(result.password).not.toBe('senha456');
    expect(mockUserRepository.create).toHaveBeenCalled();
  });
});