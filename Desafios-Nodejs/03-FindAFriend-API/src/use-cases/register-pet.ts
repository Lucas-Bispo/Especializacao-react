import { PetRepository } from "../repositories/pet-repository.js";


export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  // metodo que executa o registro de um pet
  async execute({
    name,
    description,
    age,
    size,
    energy,
    city,
    orgId,
  }: {
    name: string;
    description?: string;
    age: number;
    size: string;
    energy: string;
    city: string;
    orgId: string;
  }) {
    // cria um pet com as informacoes passadas
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      size,
      energy,
      city,
      orgId,
    });

    // retorna o pet criado
    return pet;
  }
}
