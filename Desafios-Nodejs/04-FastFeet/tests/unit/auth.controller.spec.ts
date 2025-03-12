import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/infrastructure/http/controllers/auth.controller';
import { AuthService } from '../../src/infrastructure/auth/auth.service';
import { vi } from 'vitest';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const loginDto = { cpf: '123.456.789-00', password: 'senha123' };
    const mockResult = { access_token: 'jwt-token-mock' };
    vi.spyOn(authService, 'login').mockResolvedValue(mockResult);
    const result = await controller.login(loginDto);
    expect(result).toEqual(mockResult);
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });
});