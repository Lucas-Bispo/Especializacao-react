import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import { vi } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: vi.fn(() => 'jwt') } },
        { provide: UserRepository, useValue: { findByCpf: vi.fn() } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should login successfully', async () => {
    const data = { cpf: '123.456.789-00', password: 'senha123' };
    vi.spyOn(userRepository, 'findByCpf').mockResolvedValue({ id: '1', ...data });
    const result = await authService.login(data);
    expect(result).toEqual({ token: 'jwt' });
  });
});