import { NestFactory } from '@nestjs/core';

import { setupSwagger } from './docs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express'; // Adicionar tipo Express
import { ValidationPipe } from 'src/infrastructure/http/pipes/validation.pipe';
import { AppModule } from 'src/application/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Especificar tipo
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();