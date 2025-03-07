import { OrgRepository } from '../repositories/org-repository.ts';
import { Org } from '../entities/org.ts';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthenticateOrgRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgResponse {
  org: Org;
  token: string;
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
    const org = await this.orgRepository.findByEmail(email);
    if (!org) throw new Error('Invalid credentials');

    const isPasswordValid = await compare(password, org.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({}, process.env.JWT_SECRET || 'secret', {
      subject: org.id,
      expiresIn: '1d',
    });

    return { org, token };
  }
}