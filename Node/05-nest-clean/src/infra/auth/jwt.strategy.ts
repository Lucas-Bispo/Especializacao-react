import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../domain/user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; cpf: string; role: string }) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user || (user.role !== 'admin' && user.role !== 'deliveryman' && user.role !== 'recipient')) {
      return null;
    }
    return { id: payload.sub, cpf: payload.cpf, role: payload.role };
  }
}