import { PrismaClient } from '@prisma/client';
import { OrgRepository } from './org-repository.ts';
import { Org } from '../entities/org.ts'; // Importação correta

export class PrismaOrgRepository implements OrgRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<Org | null> {
    const org = await this.prisma.org.findUnique({ where: { email } });
    if (!org) return null;
    return new Org(org.id, org.name, org.email, org.password, org.address, org.whatsapp);
  }

  async create(data: Omit<Org, 'id'>): Promise<Org> {
    const org = await this.prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        whatsapp: data.whatsapp,
      },
    });
    return new Org(org.id, org.name, org.email, org.password, org.address, org.whatsapp);
  }
}