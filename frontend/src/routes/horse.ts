import { Router, Request, Response } from 'express';
import { PrismaClient, Horse } from '@prisma/client';

export default function horseRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /horses - List all horses
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const horses: Horse[] = await prisma.horse.findMany({
        include: { client: true, service: true },
      });
      res.json(horses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch horses.' });
    }
  });

  // POST /horses - Create a new horse
  router.post('/', async (req: Request, res: Response) => {
    const { name, clientId, serviceId } = req.body;
    try {
      const newHorse = await prisma.horse.create({
        data: { name, clientId, serviceId },
      });
      res.status(201).json(newHorse);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create horse.' });
    }
  });

  // GET /horses/:id - Get one horse
  router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const horse = await prisma.horse.findUnique({
        where: { id },
        include: { client: true, service: true },
      });
      if (!horse) return res.status(404).json({ error: 'Horse not found.' });
      res.json(horse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch horse.' });
    }
  });

  // PUT /horses/:id - Update a horse
  router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, serviceId } = req.body;
    try {
      const updated = await prisma.horse.update({
        where: { id },
        data: { name, serviceId },
      });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update horse.' });
    }
  });

  // DELETE /horses/:id - Delete a horse
  router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      await prisma.horse.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete horse.' });
    }
  });

  return router;
}
