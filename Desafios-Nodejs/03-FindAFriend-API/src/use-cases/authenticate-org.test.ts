import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaOrgRepository } from '../repositories/org-repository.js';
import { AuthenticateOrgUseCase } from './authenticate-org.js';

const prisma = new PrismaClient();

describe('AuthenticateOrgUseCase', () => {
  let orgRepository: PrismaOrgRepository;
  let authenticateOrg: AuthenticateOrgUseCase;

  beforeAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();
    orgRepository = new PrismaOrgRepository();
    authenticateOrg = new AuthenticateOrgUseCase(orgRepository);

    // Criar uma ORG para teste
    await prisma.org.create({
      data: {
        name: 'Auth Org',
        email: 'auth@org.com',
        password: await hash('123456', 10),
        address: 'Rua Auth, 789',
        whatsapp: '111222333',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve autenticar uma ORG com credenciais válidas', async () => {
    const result = await authenticateOrg.execute({
      email: 'auth@org.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
    expect(typeof result.token).toBe('string');
  });

  it('deve falhar ao autenticar com email inválido', async () => {
    await expect(
      authenticateOrg.execute({
        email: 'wrong@org.com',
        password: '123456',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('deve falhar ao autenticar com senha inválida', async () => {
    await expect(
      authenticateOrg.execute({
        email: 'auth@org.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });
});