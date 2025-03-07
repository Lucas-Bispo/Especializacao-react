import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Prisma Database Connection', () => {
  beforeAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();
  });

  beforeEach(async () => {
    // Limpar antes de cada teste para evitar conflitos
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve criar uma ORG no banco de dados', async () => {
    const orgData = {
      name: 'Test Org',
      email: `test-${Date.now()}@org.com`, // Email único
      password: '123456',
      address: 'Rua Teste, 123',
      whatsapp: '123456789',
    };

    const org = await prisma.org.create({
      data: orgData,
    });

    expect(org).toHaveProperty('id');
    expect(org.name).toBe(orgData.name);
    expect(org.email).toBe(orgData.email);
    expect(org.address).toBe(orgData.address);
    expect(org.whatsapp).toBe(orgData.whatsapp);
  });

  it('deve criar um Pet vinculado a uma ORG', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Pet Org',
        email: `pet-${Date.now()}@org.com`, // Email único
        password: '123456',
        address: 'Rua Pet, 456',
        whatsapp: '987654321',
      },
    });

    const petData = {
      name: 'Rex',
      age: 2,
      size: 'Médio',
      energy: 'Alto',
      city: 'São Paulo',
      orgId: org.id,
    };

    const pet = await prisma.pet.create({
      data: petData,
    });

    expect(pet).toHaveProperty('id');
    expect(pet.name).toBe(petData.name);
    expect(pet.age).toBe(petData.age);
    expect(pet.size).toBe(petData.size);
    expect(pet.energy).toBe(petData.energy);
    expect(pet.city).toBe(petData.city);
    expect(pet.orgId).toBe(org.id);
  });

  it('deve listar Pets por cidade', async () => {
    await prisma.org.create({
      data: {
        name: 'List Org',
        email: `list-${Date.now()}@org.com`, // Email único
        password: '123456',
        address: 'Rua List, 789',
        whatsapp: '111222333',
      },
    });

    await prisma.pet.create({
      data: {
        name: 'Fido',
        age: 3,
        size: 'Grande',
        energy: 'Baixo',
        city: 'São Paulo',
        orgId: (await prisma.org.findFirst())!.id,
      },
    });

    const pets = await prisma.pet.findMany({
      where: { city: 'São Paulo' },
    });

    expect(pets.length).toBeGreaterThan(0);
    expect(pets[0].city).toBe('São Paulo');
  });
});