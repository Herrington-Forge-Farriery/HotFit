// File: backend/src/routes/timecard.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, Timecard } from '@prisma/client';

export default function timecardRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /timecards — list all timecards, optional filter by employeeId
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.query;
      const where = employeeId ? { employeeId: Number(employeeId) } : {};
      const timecards: Timecard[] = await prisma.timecard.findMany({ where });
      res.json(timecards);
    } catch (err) {
      next(err);
    }
  });

  // POST /timecards — clock in or clock out
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId, clockIn, clockOut } = req.body;
      const data: any = { employeeId: Number(employeeId) };
      if (clockIn) data.clockIn = new Date(clockIn);
      if (clockOut) data.clockOut = new Date(clockOut);
      const entry: Timecard = await prisma.timecard.create({ data });
      res.status(201).json(entry);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
