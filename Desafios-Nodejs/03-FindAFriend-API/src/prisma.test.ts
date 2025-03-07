import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

describe('Prisma Database Connection', () => {
  let prisma: PrismaClient;
  let orgId: string;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.pet.deleteMany(); // Limpa os pets
    await prisma.org.deleteMany(); // Limpa as orgs

    const org = await prisma.org.create({
      data: {
        name: 'Test Org',
        email: `test-${Date.now()}@org.com`, // Email único
        password: 'hashedpassword',
        address: 'Rua Teste, 123',
        whatsapp: '123456789',
      },
    });
    orgId = org.id; // Armazena o ID da ORG criada
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar uma ORG no banco de dados', async () => {
    const org = await prisma.org.findUnique({ where: { id: orgId } });
    expect(org).toBeDefined();
    expect(org?.email).toMatch(/test-\d+@org\.com/);
  });

  it('deve criar um Pet vinculado a uma ORG', async () => {
    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        age: 2,
        size: 'Médio',
        energy: 'Alto',
        city: 'São Paulo',
        org: {
          connect: { id: orgId }, // Vincula ao org existente
        },
      },
    });

    expect(pet).toBeDefined();
    expect(pet.name).toBe('Rex');
    expect(pet.org_id).toBe(orgId); // Verifica a vinculação
  });

  it('deve listar Pets por cidade', async () => {
    const pets = await prisma.pet.findMany({
      where: { city: 'São Paulo' },
    });

    expect(pets).toHaveLength(1);
    expect(pets[0].city).toBe('São Paulo');
    expect(pets[0].org_id).toBe(orgId);
  });
});