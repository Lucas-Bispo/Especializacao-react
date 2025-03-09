import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  recipientId!: string;

  @IsOptional()
  @IsString()
  deliverymanId?: string;
}