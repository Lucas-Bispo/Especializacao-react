import { PrismaClient, Org } from '@prisma/client'; // Importa o client do Prisma e o tipo Org

// Interface que define os metodos que o repositório de orgs deve ter
export interface OrgRepository {
  // Metodo para criar uma org no banco de dados
  create(data: {
    name: string; // Nome da org
    email: string; // Email da org
    password: string; // Senha da org
    address: string; // Endereço da org
    whatsapp: string; // Whatsapp da org
  }): Promise<Org>; // Retorna uma promessa de Org

  // Metodo para encontrar uma org pelo email
  findByEmail(email: string): Promise<Org | null>; // Retorna uma promessa de Org ou null
}

// Classe que implementa a interface OrgRepository
export class PrismaOrgRepository implements OrgRepository {
  // Instancia do client do Prisma
  private prisma = new PrismaClient();

  // Metodo para criar uma org no banco de dados
  async create(data: {
    name: string;
    email: string;
    password: string;
    address: string;
    whatsapp: string;
  }) {
    // Chama o metodo create do Prisma para criar uma org no banco de dados
    return this.prisma.org.create({ data });
  }

  // Metodo para encontrar uma org pelo email
  async findByEmail(email: string) {
    // Chama o metodo findUnique do Prisma para encontrar uma org pelo email
    // O where é um objeto que define a condição de busca
    return this.prisma.org.findUnique({ where: { email } });
  }
}
