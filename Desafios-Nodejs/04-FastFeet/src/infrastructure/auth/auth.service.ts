import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cpf: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByCpf(cpf);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { cpf: user.cpf, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}