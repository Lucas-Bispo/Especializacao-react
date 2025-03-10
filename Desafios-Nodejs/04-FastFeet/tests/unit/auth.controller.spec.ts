import { Test } from '@nestjs/testing';
import { AuthController } from '../../src/infrastructure/http/controllers/auth.controller';
import { AuthService } from '../../src/infrastructure/auth/auth.service';
import { vi } from 'vitest';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { login: vi.fn() },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should login successfully', async () => {
    const data = { cpf: '123.456.789-00', password: 'senha123' };
    vi.spyOn(authService, 'login').mockResolvedValue({ access_token: 'jwt' });
    const result = await controller.login(data);
    expect(result).toEqual({ access_token: 'jwt' });
    expect(authService.login).toHaveBeenCalledWith(data);
  });
});