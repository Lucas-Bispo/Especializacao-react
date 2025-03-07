import { PrismaClient } from '@prisma/client';
import { PetRepository } from './pet-repository.ts';
import { Pet } from '../entities/pet.ts';

export class PrismaPetRepository implements PetRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<Pet, 'id'>): Promise<Pet> {
    const pet = await this.prisma.pet.create({
      data: {
        name: data.name,
        description: data.description || null,
        age: data.age,
        size: data.size,
        energy: data.energy,
        city: data.city,
        org_id: data.orgId, // Usa org_id para o Prisma
      },
    });
    return new Pet(pet.id, pet.name, pet.description, pet.age, pet.size, pet.energy, pet.city, pet.org_id);
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) return null;
    return new Pet(pet.id, pet.name, pet.description, pet.age, pet.size, pet.energy, pet.city, pet.org_id);
  }

  async findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        city,
        ...(filters?.age && { age: filters.age }),
        ...(filters?.size && { size: filters.size }),
        ...(filters?.energy && { energy: filters.energy }),
      },
    });
    return pets.map(pet => new Pet(pet.id, pet.name, pet.description, pet.age, pet.size, pet.energy, pet.city, pet.org_id));
  }
}