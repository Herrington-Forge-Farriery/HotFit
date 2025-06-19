// File: backend/tests/timecard.test.ts
import request from 'supertest';
import { execSync } from 'child_process';
import { app, prisma } from '../src/index';

describe('Timecard API (integration)', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /timecards should return an empty array', async () => {
    const res = await request(app).get('/timecards');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /timecards should create a clock-in record', async () => {
    // Create an employee for the test
    const employee = await prisma.employee.create({
      data: { name: 'Alice', phone: '555-0000' }
    });

    const res = await request(app)
      .post('/timecards')
      .send({ employeeId: employee.id, clockIn: '2025-06-19T12:00:00.000Z' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ employeeId: employee.id });
  });
});
