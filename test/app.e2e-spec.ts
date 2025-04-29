import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('GET /users - Should return an array of users with status 200', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    console.log(res.body);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  })
});
