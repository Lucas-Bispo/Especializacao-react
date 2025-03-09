export class User {
    constructor(
      public id: string,
      public cpf: string,
      public password: string,
      public role: 'admin' | 'deliveryman',
      public name: string,
      public latitude?: number | null, // Aceitar null
      public longitude?: number | null, // Aceitar null
    ) {}
  }