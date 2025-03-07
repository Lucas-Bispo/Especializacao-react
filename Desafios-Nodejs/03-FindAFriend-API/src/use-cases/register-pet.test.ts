import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { RegisterPetUseCase } from './register-pet.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';
import { PrismaClient } from '@prisma/client';

describe('RegisterPetUseCase', () => {
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
    orgId = org.id; // Armazena o ID da ORG
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a pet successfully', async () => {
    const registerPet = new RegisterPetUseCase(petRepository);

    const pet = await registerPet.execute({
      name: 'Rex',
      description: 'Cão amigável',
      age: 2,
      size: 'Médio',
      energy: 'Alto',
      city: 'São Paulo',
      orgId, // Usa o orgId criado
    });

    expect(pet.id).toBeDefined();
    expect(pet.name).toBe('Rex');
  });
});