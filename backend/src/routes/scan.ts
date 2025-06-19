// File: backend/src/routes/scan.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, ScanEvent } from '@prisma/client';

export default function scanRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /scans — list all scan events, optional filter by synced flag
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { synced } = req.query;
      const where = synced === undefined ? {} : { synced: synced === 'true' };
      const scans: ScanEvent[] = await prisma.scanEvent.findMany({ where });
      res.json(scans);
    } catch (err) {
      next(err);
    }
  });

  // POST /scans — create a new scan event
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, action, timestamp } = req.body;
      // Build data object, use provided timestamp or default now
      const data: Partial<ScanEvent> & { code: string; action: string; } = {
        code,
        action,
        synced: false,
      };
      if (timestamp) {
        data.timestamp = new Date(timestamp);
      }
      // Create scan event
      const scan: ScanEvent = await prisma.scanEvent.create({ data });
      res.status(201).json(scan);
    } catch (err) {
      next(err);
    }
  });

  // PUT /scans/:id — update synced flag
  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { synced } = req.body;
      const scan = await prisma.scanEvent.update({
        where: { id: Number(id) },
        data: { synced: Boolean(synced) },
      });
      res.json(scan);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /scans/:id — remove a scan event
  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await prisma.scanEvent.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
