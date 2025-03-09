import { NestFactory } from '@nestjs/core';

import { setupSwagger } from './docs/swagger.config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/application/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();