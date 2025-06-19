// File: backend/src/routes/horse.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, Horse } from '@prisma/client';

export default function horseRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /horses - List all horses
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const horses: Horse[] = await prisma.horse.findMany({
        include: { client: true, service: true },
      });
      res.json(horses);
    } catch (error) {
      next(error);
    }
  });

  // POST /horses - Create a new horse
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, clientId, serviceId } = req.body;
      const horse: Horse = await prisma.horse.create({
        data: { name, clientId, serviceId },
      });
      res.status(201).json(horse);
    } catch (error) {
      next(error);
    }
  });

  // GET /horses/:id - fetch one horse
  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const horse: Horse | null = await prisma.horse.findUnique({
        where: { id },
        include: { client: true, service: true },
      });
      if (!horse) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(horse);
    } catch (error) {
      next(error);
    }
  });

  // PUT /horses/:id - update a horse
  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { name, clientId, serviceId } = req.body;
      const horse: Horse = await prisma.horse.update({
        where: { id },
        data: { name, clientId, serviceId },
      });
      res.json(horse);
    } catch (error) {
      next(error);
    }
  });

  // DELETE /horses/:id - remove a horse
  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await prisma.horse.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}
