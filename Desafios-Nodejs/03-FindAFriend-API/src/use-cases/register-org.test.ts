import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { RegisterOrgUseCase } from './register-org.ts';
import { PrismaOrgRepository } from '../repositories/prisma-org-repository.ts';
import { PrismaClient } from '@prisma/client';

describe('RegisterOrgUseCase', () => {
  let prisma: PrismaClient;
  let orgRepository: PrismaOrgRepository;
  let registerOrg: RegisterOrgUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    orgRepository = new PrismaOrgRepository();
    registerOrg = new RegisterOrgUseCase(orgRepository);
    await prisma.org.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register an org successfully', async () => {
    const org = await registerOrg.execute({
      name: 'Org Test',
      email: 'test@org.com',
      password: '123456',
      address: 'Rua Teste, 123',
      whatsapp: '123456789',
    });

    expect(org.id).toBeDefined();
    expect(org.email).toBe('test@org.com');
  });

  it('should throw an error if email already exists', async () => {
    await expect(
      registerOrg.execute({
        name: 'Org Test 2',
        email: 'test@org.com', // Mesmo email
        password: '123456',
        address: 'Rua Teste, 456',
        whatsapp: '987654321',
      })
    ).rejects.toThrow();
  });
});