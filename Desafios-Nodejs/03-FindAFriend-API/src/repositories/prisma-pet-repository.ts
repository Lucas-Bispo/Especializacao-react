import { PrismaClient, Pet } from '@prisma/client';
import { PetRepository } from './pet-repository.ts';

export class PrismaPetRepository implements PetRepository {
  private prisma = new PrismaClient();

  async create(data: {
    name: string;
    description?: string;
    age: number;
    size: string;
    energy: string;
    city: string;
    orgId: string;
  }) {
    return this.prisma.pet.create({ data });
  }

  async findById(id: string) {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  async findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }) {
    return this.prisma.pet.findMany({
      where: {
        city,
        ...(filters?.age && { age: filters.age }),
        ...(filters?.size && { size: filters.size }),
        ...(filters?.energy && { energy: filters.energy }),
      },
    });
  }
}