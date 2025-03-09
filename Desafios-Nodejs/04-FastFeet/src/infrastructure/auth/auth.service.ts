import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { UserRepository } from '../../domain/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/domain/user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: { cpf: string; password: string }) {
    const user = await this.userRepository.findByCpf(credentials.cpf);
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, cpf: user.cpf, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}