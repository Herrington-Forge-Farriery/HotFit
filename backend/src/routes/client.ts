// File: backend/src/routes/client.ts
import { Router, Request, Response } from 'express';
import { PrismaClient, Client as ClientModel } from '@prisma/client';

export default function clientRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /clients — list all clients
  router.get('/', async (req: Request, res: Response) => {
    try {
      const clients: ClientModel[] = await prisma.client.findMany({
        include: { horses: true, invoices: true },
      });
      res.json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  });

  // GET /clients/:id — fetch one client
  router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    try {
      const client = await prisma.client.findUnique({
        where: { id },
        include: { horses: true, invoices: true },
      });
      if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  });

  // POST /clients — create a new client
  router.post('/', async (req: Request, res: Response) => {
    const { firstName, lastName, phone, email } = req.body;
    try {
      const newClient = await prisma.client.create({
        data: { firstName, lastName, phone, email },
      });
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create client' });
    }
  });

  // PUT /clients/:id — update a client
  router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    const { firstName, lastName, phone, email } = req.body;
    try {
      const updatedClient = await prisma.client.update({
        where: { id },
        data: { firstName, lastName, phone, email },
      });
      res.json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update client' });
    }
  });

  // DELETE /clients/:id — remove a client
  router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }
    try {
      await prisma.client.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete client' });
    }
  });

  return router;
}
