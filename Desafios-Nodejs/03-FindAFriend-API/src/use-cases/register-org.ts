import { hash } from 'bcrypt';
import { OrgRepository } from '../repositories/org-repository.js';

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    whatsapp,
  }: {
    name: string;
    email: string;
    password: string;
    address: string;
    whatsapp: string;
  }) {
    const existingOrg = await this.orgRepository.findByEmail(email);
    if (existingOrg) throw new Error('Email already exists');

    const hashedPassword = await hash(password, 10);
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