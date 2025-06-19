// File: backend/tests/invoice.test.ts
import request from 'supertest';
import { execSync } from 'child_process';
import { app, prisma } from '../src/index';

describe('Invoice API (integration)', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /invoices should return an empty array', async () => {
    const res = await request(app).get('/invoices');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /invoices should create an invoice with items', async () => {
    // Create a client
    const client = await prisma.client.create({
      data: { firstName: 'John', lastName: 'Smith', phone: '555-6789', email: 'john@smith.test' }
    });
    // Create a service
    const service = await prisma.service.create({ data: { name: 'Trim', price: 50 } });

    const res = await request(app)
      .post('/invoices')
      .send({
        clientId: client.id,
        items: [
          { serviceId: service.id, quantity: 2, unitPrice: 50 }
        ]
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ clientId: client.id });
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0]).toMatchObject({ serviceId: service.id, quantity: 2 });
  });
});
