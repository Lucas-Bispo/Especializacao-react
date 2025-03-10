import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/infrastructure/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../src/domain/user/repositories/user.repository';
import { vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: { findByCpf: vi.fn() } },
        { provide: JwtService, useValue: { sign: vi.fn(() => 'jwt') } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should login successfully', async () => {
    const data = { cpf: '123.456.789-00', password: 'senha123' };
    vi.spyOn(userRepository, 'findByCpf').mockResolvedValue({
      id: '1',
      cpf: data.cpf,
      password: data.password,
      role: 'recipient',
      name: 'Test User',
    });
    const result = await service.login(data);
    expect(result).toEqual({ access_token: 'jwt' });
  });
});