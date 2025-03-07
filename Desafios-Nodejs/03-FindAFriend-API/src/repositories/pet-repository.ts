/*************  ✨ Codeium Command 🌟  *************/
import { PrismaClient, Pet } from '@prisma/client';

// Interface que define os metodos que o repositório de pets deve ter
export interface PetRepository {
  // Metodo para criar um pet no banco de dados
  create(data: {
    name: string;
    description?: string;
    age: number;
    size: string;
    energy: string;
    city: string;
    orgId: string;
  }): Promise<Pet>;

  // Metodo para encontrar um pet pelo id
  findById(id: string): Promise<Pet | null>;

  // Metodo para encontrar varios pets por cidade e filtrar por idade, tamanho e energia
  findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }): Promise<Pet[]>;
}

// Classe que implementa a interface PetRepository
export class PrismaPetRepository implements PetRepository {
  // Instancia do client do Prisma
  private prisma = new PrismaClient();

  // Metodo para criar um pet no banco de dados
  async create(data: {
    name: string;
    description?: string;
    age: number;
    size: string;
    energy: string;
    city: string;
    orgId: string;
  }) {
    // Chama o metodo create do Prisma para criar um pet no banco de dados
    return this.prisma.pet.create({ data });
  }

  // Metodo para encontrar um pet pelo id
  async findById(id: string) {
    // Chama o metodo findUnique do Prisma para encontrar um pet pelo id
    return this.prisma.pet.findUnique({ where: { id } });
  }

  // Metodo para encontrar varios pets por cidade e filtrar por idade, tamanho e energia
  async findManyByCity(city: string, filters?: { age?: number; size?: string; energy?: string }) {
    // Chama o metodo findMany do Prisma para encontrar varios pets por cidade e filtrar por idade, tamanho e energia
    return this.prisma.pet.findMany({
      where: {
        city,
        // Se o filtro de idade for informado, adiciona ele ao where
        ...(filters?.age && { age: filters.age }),
        // Se o filtro de tamanho for informado, adiciona ele ao where
        ...(filters?.size && { size: filters.size }),
        // Se o filtro de energia for informado, adiciona ele ao where
        ...(filters?.energy && { energy: filters.energy }),
      },
    });
  }
}
/******  e3d14fb0-e987-4020-908b-d58667028c48  *******/