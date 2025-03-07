import { Pet } from '../entities/pet.ts';

export interface PetRepository {
  create(data: Omit<Pet, 'id'>): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }): Promise<Pet[]>;
}