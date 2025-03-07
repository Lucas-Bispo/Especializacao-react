import { Pet } from '@prisma/client';

export interface PetRepository {
  create(data: {
    name: string;
    description?: string;
    age: number;
    size: string;
    energy: string;
    city: string;
    orgId: string;
  }): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }): Promise<Pet[]>;
}