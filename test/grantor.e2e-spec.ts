import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GrantorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new grantor', () => {
    return request(app.getHttpServer())
      .post('/api/v1/grantor')
      .send({
        name: 'Empresa 1',
        legalName: 'Empresa 1 LTDA',
        documentNumber: '123456',
        documentType: 'CNPJ',
      })
      .expect(201);
  });
});
