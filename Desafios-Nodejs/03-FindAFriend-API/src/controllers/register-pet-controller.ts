import { Request, Response } from 'express';
import { RegisterPetUseCase } from '../use-cases/register-pet.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';

export async function registerPetController(req: Request, res: Response) {
  const { name, description, age, size, energy, city } = req.body;
  const orgId = req.orgId;

  if (!orgId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const petRepository = new PrismaPetRepository();
    const registerPet = new RegisterPetUseCase(petRepository);

    const pet = await registerPet.execute({
      name,
      description,
      age,
      size,
      energy,
      city,
      orgId,
    });

    return res.status(201).json(pet);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to register pet' });
  }
}