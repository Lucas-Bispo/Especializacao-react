import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  recipientId?: string;

  @IsOptional()
  @IsString()
  deliverymanId?: string | null;

  @IsOptional()
  @IsEnum(['awaiting', 'picked_up', 'delivered', 'returned'])
  status?: 'awaiting' | 'picked_up' | 'delivered' | 'returned';

  @IsOptional()
  @IsString()
  photoUrl?: string | null;
}