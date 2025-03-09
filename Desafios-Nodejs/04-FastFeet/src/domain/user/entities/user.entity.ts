export class User {
  constructor(
    public id: string,
    public cpf: string,
    public password: string,
    public role: 'admin' | 'deliveryman' | 'recipient',
    public name: string,
    public latitude?: number | null,
    public longitude?: number | null,
  ) {}
}