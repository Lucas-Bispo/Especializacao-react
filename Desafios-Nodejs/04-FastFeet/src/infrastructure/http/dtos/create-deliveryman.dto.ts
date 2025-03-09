import { IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateDeliverymanDto {
  @IsString()
  cpf!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}