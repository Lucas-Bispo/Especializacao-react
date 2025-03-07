import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { AuthenticateOrgUseCase } from './authenticate-org.ts';
import { PrismaOrgRepository } from '../repositories/prisma-org-repository.ts';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

describe('AuthenticateOrgUseCase', () => {
  let prisma: PrismaClient;
  let orgRepository: PrismaOrgRepository;
  let authenticateOrg: AuthenticateOrgUseCase;

  beforeAll(async () => {
    prisma = new PrismaClient();
    orgRepository = new PrismaOrgRepository();
    authenticateOrg = new AuthenticateOrgUseCase(orgRepository);
    await prisma.pet.deleteMany(); // Primeiro exclui os Pets (dependentes)
    await prisma.org.deleteMany(); // Depois exclui as ORGs

    await prisma.org.create({
      data: {
        name: 'Org Test',
        email: 'test@org.com',
        password: await hash('123456', 6),
        address: 'Rua Teste, 123',
        whatsapp: '123456789',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should authenticate an org with valid credentials', async () => {
    const { org, token } = await authenticateOrg.execute({
      email: 'test@org.com',
      password: '123456',
    });

    expect(org.id).toBeDefined();
    expect(org.email).toBe('test@org.com');
    expect(token).toBeDefined();
  });

  it('should throw an error with invalid credentials', async () => {
    await expect(
      authenticateOrg.execute({
        email: 'test@org.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });
});