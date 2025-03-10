import { Test } from '@nestjs/testing';
import { AuthController } from '../../src/infrastructure/http/controllers/auth.controller';
import { AuthService } from '../../src/infrastructure/auth/auth.service'; // Mesmo import
import { vi } from 'vitest';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      login: vi.fn(), // Mock do método login
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService, // Classe exata
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    console.log('authService mockado:', authService); // Deve mostrar o mock
    console.log('authController criado:', authController); // Deve mostrar o controller com authService
  });

  it('should login successfully', async () => {
    const data = { cpf: '123.456.789-00', password: 'senha123' };
    vi.spyOn(authService, 'login').mockResolvedValue({ access_token: 'jwt' });
    console.log('authService antes da chamada:', authService); // Verificar antes da chamada
    console.log('authController.authService:', (authController as any).authService); // Acessar diretamente
    const result = await authController.login(data);
    expect(result).toEqual({ access_token: 'jwt' });
    expect(authService.login).toHaveBeenCalledWith(data);
  });
});