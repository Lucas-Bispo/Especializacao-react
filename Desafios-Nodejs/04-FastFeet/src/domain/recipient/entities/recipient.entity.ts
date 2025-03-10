export class Recipient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cpf: string,
    public readonly password: string,
    public readonly address: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
  ) {}
}