import { IsString } from 'class-validator';

export class DeliverOrderDto {
  @IsString()
  photoUrl!: string;
}