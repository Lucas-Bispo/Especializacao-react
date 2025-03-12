// tests/unit/deliveryman.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DeliverymanController } from '../../src/infrastructure/http/controllers/deliveryman.controller';
import { CreateDeliverymanUseCase } from '../../src/domain/user/use-cases/create-deliveryman.use-case';

import { JwtAuthGuard } from '../../src/infrastructure/auth/auth.guard';
import { RolesGuard } from '../../src/infrastructure/auth/roles.guard';
import { ZodValidationPipe } from '../../src/infrastructure/http/pipes/zod-validation.pipe';
import { vi } from 'vitest';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

describe('DeliverymanController', () => {
  let controller: DeliverymanController;
  let createDeliverymanUseCase: CreateDeliverymanUseCase;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverymanController],
      providers: [
        {
          provide: CreateDeliverymanUseCase,
          useValue: { execute: vi.fn() },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: vi.fn(),
              findUnique: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
        { provide: JwtAuthGuard, useValue: { canActivate: vi.fn(() => true) } },
        { provide: RolesGuard, useValue: { canActivate: vi.fn(() => true) } },
        { provide: ZodValidationPipe, useValue: { transform: vi.fn((value) => value) } },
      ],
    }).compile();

    controller = module.get<DeliverymanController>(DeliverymanController);
    createDeliverymanUseCase = module.get<CreateDeliverymanUseCase>(CreateDeliverymanUseCase);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create a deliveryman', async () => {
    const dto = { name: 'João', cpf: '123.456.789-00', password: 'senha123' };
    const mockResult = { id: '1', ...dto, role: 'deliveryman' };
    vi.spyOn(createDeliverymanUseCase, 'execute').mockResolvedValue(mockResult);
    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
  });

  it('should list all deliverymen', async () => {
    const mockResult = [{ id: '1', name: 'João', cpf: '123.456.789-00', role: 'deliveryman' }];
    vi.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockResult);
    const result = await controller.findAll();
    expect(result).toEqual(mockResult);
  });

  it('should get one deliveryman', async () => {
    const mockResult = { id: '1', name: 'João', cpf: '123.456.789-00', role: 'deliveryman' };
    vi.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockResult);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockResult);
  });

  it('should update a deliveryman', async () => {
    const dto = { name: 'João Atualizado' };
    const mockResult = { id: '1', name: 'João Atualizado', cpf: '123.456.789-00', role: 'deliveryman' };
    vi.spyOn(prismaService.user, 'update').mockResolvedValue(mockResult);
    const result = await controller.update('1', dto);
    expect(result).toEqual(mockResult);
  });

  it('should delete a deliveryman', async () => {
    const mockResult = { id: '1', name: 'João', cpf: '123.456.789-00', role: 'deliveryman' };
    vi.spyOn(prismaService.user, 'delete').mockResolvedValue(mockResult);
    const result = await controller.delete('1');
    expect(result).toEqual(mockResult);
  });
});