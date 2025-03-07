import { Pet } from './pet.ts';

export class Org {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public address: string,
    public whatsapp: string,
    public pets: Pet[] = []
  ) {}

  // Método corrigido
  hasPets(): boolean {
    return this.pets.length > 0;
  }
}