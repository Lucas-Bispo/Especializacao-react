import { OrgRepository } from '../repositories/org-repository.ts';
import { Org } from '../entities/org.ts';
import { hash } from 'bcryptjs';

interface RegisterOrgRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  whatsapp: string;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ name, email, password, address, whatsapp }: RegisterOrgRequest): Promise<Org> {
    const hashedPassword = await hash(password, 6);
    const org = await this.orgRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      whatsapp,
    });
    return org;
  }
}