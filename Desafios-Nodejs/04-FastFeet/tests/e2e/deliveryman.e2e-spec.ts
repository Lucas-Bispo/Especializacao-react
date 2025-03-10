import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
 // Caminho ajustado
import { vi } from 'vitest';
import { AppModule } from 'src/application/app.module';

describe('Deliveryman (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const login = await request(app.getHttpServer())
      .post('/auth')
      .send({ cpf: '123.456.789-00', password: 'senha123' });
    token = login.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /deliverymen should create a deliveryman', async () => {
    const response = await request(app.getHttpServer())
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token}`)
      .send({ cpf: '987.654.321-00', password: 'senha456', name: 'Pedro' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});