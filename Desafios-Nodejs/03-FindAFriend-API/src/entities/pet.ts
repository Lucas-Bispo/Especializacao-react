export class Pet {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public age: number,
    public size: string,
    public energy: string,
    public city: string,
    public orgId: string // Note que aqui é orgId
  ) {}
}