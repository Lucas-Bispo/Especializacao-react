import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { RegisterPetUseCase } from './register-pet.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';
import { PrismaClient } from '@prisma/client';

describe('RegisterPetUseCase', () => {
  let prisma: PrismaClient;
  let petRepository: PrismaPetRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    petRepository = new PrismaPetRepository();
    await prisma.pet.deleteMany();
    await prisma.org.deleteMany();

    await prisma.org.create({
      data: {
        name: 'Org Test',
        email: 'test@org.com',
        password: 'hashedpassword',
        address: 'Rua Teste, 123',
        whatsapp: '123456789',
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a pet successfully', async () => {
    const registerPet = new RegisterPetUseCase(petRepository);

    const org = await prisma.org.findFirst();
    if (!org) throw new Error('Org not found');

    const pet = await registerPet.execute({
      name: 'Rex',
      description: 'Cão amigável',
      age: 2,
      size: 'Médio',
      energy: 'Alto',
      city: 'São Paulo',
      orgId: org.id,
    });

    expect(pet.id).toBeDefined();
    expect(pet.name).toBe('Rex');
  });
});