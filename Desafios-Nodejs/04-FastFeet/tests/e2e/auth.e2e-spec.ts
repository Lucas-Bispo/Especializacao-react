import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
 // Caminho ajustado
import { vi } from 'vitest';
import { AppModule } from 'src/application/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth should return a token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ cpf: '123.456.789-00', password: 'senha123' })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
  });
});