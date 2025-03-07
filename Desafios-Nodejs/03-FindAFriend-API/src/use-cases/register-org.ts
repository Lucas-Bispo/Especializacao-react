import { PetRepository } from '../repositories/pet-repository.ts';
import { Pet } from '../entities/pet.ts';

interface RegisterPetRequest {
  name: string;
  description?: string;
  age: number;
  size: string;
  energy: string;
  city: string;
  orgId: string;
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: RegisterPetRequest): Promise<Pet> {
    const pet = await this.petRepository.create(data);
    return pet;
  }
}