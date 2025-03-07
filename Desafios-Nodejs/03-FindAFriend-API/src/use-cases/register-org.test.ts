import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { PrismaClient } from '@prisma/client';
import { PrismaOrgRepository } from '../repositories/org-repository.js';
import { RegisterOrgUseCase } from './register-org.js';

const prisma = new PrismaClient();

describe('RegisterOrgUseCase', () => {
  let orgRepository: PrismaOrgRepository;
  let registerOrg: RegisterOrgUseCase;

  beforeAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();
    orgRepository = new PrismaOrgRepository();
    registerOrg = new RegisterOrgUseCase(orgRepository);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar uma ORG com sucesso', async () => {
    const orgData = {
      name: 'Test Org',
      email: 'test@org.com',
      password: '123456',
      address: 'Rua Teste, 123',
      whatsapp: '123456789',
    };

    const org = await registerOrg.execute(orgData);

    expect(org).toHaveProperty('id');
    expect(org.email).toBe(orgData.email);
    expect(org.password).not.toBe(orgData.password); // Verifica criptografia
  });

  it('deve falhar ao cadastrar ORG com email duplicado', async () => {
    const orgData = {
      name: 'Duplicate Org',
      email: 'duplicate@org.com',
      password: '123456',
      address: 'Rua Duplicada, 456',
      whatsapp: '987654321',
    };

    await registerOrg.execute(orgData);
    await expect(registerOrg.execute(orgData)).rejects.toThrow('Email already exists');
  });
});