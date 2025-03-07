
import { sign } from 'jsonwebtoken';
import { OrgRepository } from '../repositories/org-repository.ts';
import { Org } from '../entities/org.ts';
import { compare } from 'bcrypt';

interface AuthenticateOrgRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgResponse {
  org: Omit<Org, 'password' | 'pets'>;
  token: string;
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await compare(password, org.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = sign({}, process.env.JWT_SECRET || 'default-secret', {
      subject: org.id,
      expiresIn: '1d',
    });

    return {
      org: {
        id: org.id,
        name: org.name,
        email: org.email,
        address: org.address,
        whatsapp: org.whatsapp,
      },
      token,
    };
  }
}