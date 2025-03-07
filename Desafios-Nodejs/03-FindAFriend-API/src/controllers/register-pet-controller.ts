import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterPetUseCase } from '../use-cases/register-pet.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';

const registerPetSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  age: z.number().int().positive(),
  size: z.string().min(1),
  energy: z.string().min(1),
  city: z.string().min(1),
});

export async function registerPetController(req: Request, res: Response) {
  const orgId = req.orgId;
  if (!orgId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = registerPetSchema.parse(req.body);
    const petRepository = new PrismaPetRepository();
    const registerPet = new RegisterPetUseCase(petRepository);

    const pet = await registerPet.execute({ ...data, orgId });
    return res.status(201).json(pet);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(400).json({ error: 'Failed to register pet' });
  }
}