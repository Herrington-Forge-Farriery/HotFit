// File: backend/tests/horse.test.ts
import request from 'supertest';
import { execSync } from 'child_process';
import { app, prisma } from '../src/index';

beforeAll(() => {
  // Ensure we’re in “test” mode so app.listen() is skipped
  process.env.NODE_ENV = 'test';
  // Reset your SQLite DB and re-apply all migrations
  execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Horse API (integration)', () => {
  it('GET /horses should return an empty array', async () => {
    const res = await request(app).get('/horses');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /horses should create a horse', async () => {
    // First create a client directly via Prisma
    const client = await prisma.client.create({
      data: { firstName: 'Jane', lastName: 'Doe', phone: '555-1234', email: 'jane@doe.test' }
    });

    const res = await request(app)
      .post('/horses')
      .send({ name: 'Spirit', clientId: client.id })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: 'Spirit',
      clientId: client.id
    });
  });
});
