import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { PrismaClient } from '@prisma/client';
import { PrismaPetRepository } from '../repositories/pet-repository.js';
import { RegisterPetUseCase } from './register-pet.js';

const prisma = new PrismaClient();

describe('RegisterPetUseCase', () => {
  let petRepository: PrismaPetRepository;
  let registerPet: RegisterPetUseCase;

  beforeAll(async () => {
    // Limpa o banco de dados antes de cadastrar os pets
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany(); // Esta linha causa o erro
    petRepository = new PrismaPetRepository();
    registerPet = new RegisterPetUseCase(petRepository);

    await prisma.org.create({
      data: {
        id: 'org-1',
        name: 'Pet Org',
        email: 'pet@org.com',
        password: '123456',
        address: 'Rua Pet, 456',
        whatsapp: '987654321',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar um Pet com sucesso', async () => {
    const petData = {
      name: 'Rex',
      description: 'Cão amigável',
      age: 2,
      size: 'Médio',
      energy: 'Alto',
      city: 'São Paulo',
      orgId: 'org-1',
    };

    const pet = await registerPet.execute(petData);

    expect(pet).toHaveProperty('id');
    expect(pet.name).toBe(petData.name);
    expect(pet.city).toBe(petData.city);
    expect(pet.orgId).toBe(petData.orgId);
  });
});