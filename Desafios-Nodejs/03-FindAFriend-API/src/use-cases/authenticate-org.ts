import jwt from 'jsonwebtoken'; // Importa o módulo inteiro
import { compare } from 'bcrypt';
import { OrgRepository } from '../repositories/org-repository.js';


export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const org = await this.orgRepository.findByEmail(email);
    if (!org) throw new Error('Invalid credentials');

    const passwordMatch = await compare(password, org.password);
    if (!passwordMatch) throw new Error('Invalid credentials');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not defined in environment');

    const token = jwt.sign({ sub: org.id }, secret, { expiresIn: '1d' }); // Usa jwt.sign
    return { token };
  }
}