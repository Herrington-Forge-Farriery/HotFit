// File: backend/tests/scan.test.ts
import request from 'supertest';
import { execSync } from 'child_process';
import { app, prisma } from '../src/index';

describe('ScanEvent API (integration)', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /scans should return an empty array', async () => {
    const res = await request(app).get('/scans');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /scans should create a scan event with default synced=false', async () => {
    const scanData = {
      code: 'TESTCODE',
      action: 'TEST_ACTION',
    };

    const postRes = await request(app)
      .post('/scans')
      .send(scanData)
      .set('Content-Type', 'application/json');

    expect(postRes.status).toBe(201);
    expect(postRes.body).toMatchObject({
      code: 'TESTCODE',
      action: 'TEST_ACTION',
      synced: false,
    });

    const getRes = await request(app).get('/scans');
    expect(getRes.status).toBe(200);
    expect(getRes.body.length).toBe(1);
    expect(getRes.body[0]).toMatchObject({
      code: 'TESTCODE',
      action: 'TEST_ACTION',
      synced: false,
    });
  });
});
