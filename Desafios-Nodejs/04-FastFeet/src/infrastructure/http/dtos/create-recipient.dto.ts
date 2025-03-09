import { IsString, IsNumber } from 'class-validator';

export class CreateRecipientDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}