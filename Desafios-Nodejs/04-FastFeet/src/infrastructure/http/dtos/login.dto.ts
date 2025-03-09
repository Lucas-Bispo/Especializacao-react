import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  cpf!: string; // Usar ! para indicar que será preenchido

  @IsString()
  @MinLength(6)
  password!: string; // Usar ! para indicar que será preenchido
}