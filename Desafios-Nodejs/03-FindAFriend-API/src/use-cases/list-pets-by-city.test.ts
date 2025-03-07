import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { PrismaClient } from '@prisma/client';

import { ListPetsByCityUseCase } from './list-pets-by-city.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';

const prisma = new PrismaClient();

describe('ListPetsByCityUseCase', () => {
  let petRepository: PrismaPetRepository;
  let listPetsByCity: ListPetsByCityUseCase;

  beforeAll(async () => {
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();
    petRepository = new PrismaPetRepository();
    listPetsByCity = new ListPetsByCityUseCase(petRepository);

    // Criar uma ORG
    const org = await prisma.org.create({
      data: {
        name: 'Pet Org',
        email: 'pet@org.com',
        password: '123456',
        address: 'Rua Pet, 456',
        whatsapp: '987654321',
      },
    });

    // Criar alguns Pets
    await prisma.pet.createMany({
      data: [
        {
          name: 'Rex',
          description: 'Cão amigável',
          age: 2,
          size: 'Médio',
          energy: 'Alto',
          city: 'São Paulo',
          orgId: org.id,
        },
        {
          name: 'Miau',
          description: 'Gato tranquilo',
          age: 1,
          size: 'Pequeno',
          energy: 'Baixo',
          city: 'São Paulo',
          orgId: org.id,
        },
        {
          name: 'Bolt',
          description: 'Cão energético',
          age: 3,
          size: 'Grande',
          energy: 'Alto',
          city: 'Rio de Janeiro',
          orgId: org.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve listar pets por cidade', async () => {
    const pets = await listPetsByCity.execute('São Paulo');

    expect(pets).toHaveLength(2);
    expect(pets.every(pet => pet.city === 'São Paulo')).toBe(true);
  });

  it('deve retornar lista vazia para cidade sem pets', async () => {
    const pets = await listPetsByCity.execute('Belo Horizonte');

    expect(pets).toHaveLength(0);
  });
});