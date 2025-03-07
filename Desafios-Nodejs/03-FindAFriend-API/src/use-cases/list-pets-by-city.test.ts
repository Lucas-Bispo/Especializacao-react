import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ListPetsByCityUseCase } from './list-pets-by-city.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';
import { PrismaClient } from '@prisma/client';

describe('ListPetsByCityUseCase', () => {
  let prisma: PrismaClient;
  let petRepository: PrismaPetRepository;
  let orgId: string;

  beforeAll(async () => {
    prisma = new PrismaClient();
    petRepository = new PrismaPetRepository();
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();

    const org = await prisma.org.create({
      data: {
        name: 'Org Test',
        email: `test-${Date.now()}@org.com`, // Email único
        password: 'hashedpassword',
        address: 'Rua Teste, 123',
        whatsapp: '123456789',
      },
    });
    orgId = org.id;

    await prisma.pet.createMany({
      data: [
        { name: 'Rex', age: 2, size: 'Médio', energy: 'Alto', city: 'São Paulo', org_id: orgId },
        { name: 'Miau', age: 1, size: 'Pequeno', energy: 'Baixo', city: 'São Paulo', org_id: orgId },
        { name: 'Bolt', age: 3, size: 'Grande', energy: 'Alto', city: 'Rio', org_id: orgId },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should list pets by city', async () => {
    const listPetsByCity = new ListPetsByCityUseCase(petRepository);

    const pets = await listPetsByCity.execute('São Paulo');

    expect(pets).toHaveLength(2);
    expect(pets.every(pet => pet.city === 'São Paulo')).toBe(true);
  });

  it('should return empty list for city with no pets', async () => {
    const listPetsByCity = new ListPetsByCityUseCase(petRepository);

    const pets = await listPetsByCity.execute('Belo Horizonte');

    expect(pets).toHaveLength(0);
  });
});