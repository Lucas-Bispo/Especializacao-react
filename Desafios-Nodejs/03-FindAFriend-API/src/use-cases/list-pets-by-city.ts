import { PetRepository } from '../repositories/pet-repository.ts';

export class ListPetsByCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(city: string) {
    const pets = await this.petRepository.findManyByCity(city);
    return pets;
  }
}