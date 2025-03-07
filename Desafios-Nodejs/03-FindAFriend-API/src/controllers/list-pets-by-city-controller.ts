import { Request, Response } from 'express';
import { ListPetsByCityUseCase } from '../use-cases/list-pets-by-city.ts';
import { PrismaPetRepository } from '../repositories/prisma-pet-repository.ts';

export async function listPetsByCityController(req: Request, res: Response) {
  const { city } = req.query;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City is required and must be a string' });
  }

  try {
    const petRepository = new PrismaPetRepository();
    const listPetsByCity = new ListPetsByCityUseCase(petRepository);

    const pets = await listPetsByCity.execute(city);
    return res.status(200).json(pets);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}