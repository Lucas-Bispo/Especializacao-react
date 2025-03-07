import { PetRepository } from '../repositories/pet-repository.ts';
import { Pet } from '../entities/pet.ts';

export class ListPetsByCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(city: string): Promise<Pet[]> {
    const pets = await this.petRepository.findManyByCity(city);
    return pets;
  }
}