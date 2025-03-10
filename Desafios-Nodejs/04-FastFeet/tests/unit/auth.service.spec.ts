import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/infrastructure/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../src/domain/user/repositories/user.repository';
import { vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findByCpf: vi.fn().mockResolvedValue({
              id: '1',
              cpf: '123.456.789-00',
              password: 'senha123',
              role: 'recipient',
              name: 'Test User',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: vi.fn(() => 'jwt') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should login successfully', async () => {
    const data = { cpf: '123.456.789-00', password: 'senha123' };
    const result = await service.login(data);
    expect(result).toEqual({ access_token: 'jwt' });
  });
});