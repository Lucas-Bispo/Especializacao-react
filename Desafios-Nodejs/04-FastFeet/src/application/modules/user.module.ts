import { Module } from '@nestjs/common';
import { UserController } from '../../infrastructure/http/controllers/user.controller';
import { LoginUseCase } from '../../domain/user/use-cases/login.use-case';
import { CreateDeliverymanUseCase } from '../../domain/user/use-cases/create-deliveryman.use-case';

import { UpdateDeliverymanUseCase } from '../../domain/user/use-cases/update-deliveryman.use-case';
import { DeleteDeliverymanUseCase } from '../../domain/user/use-cases/delete-deliveryman.use-case';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { ListDeliverymenUseCase } from 'src/domain/user/use-cases/list-deliveries.use-case';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    LoginUseCase,
    CreateDeliverymanUseCase,
    ListDeliverymenUseCase,
    UpdateDeliverymanUseCase,
    DeleteDeliverymanUseCase,
  ],
})
export class UserModule {}