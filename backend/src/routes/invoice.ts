// File: backend/src/routes/invoice.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient, Invoice, InvoiceItem } from '@prisma/client';

export default function invoiceRouter(prisma: PrismaClient) {
  const router = Router();

  // GET /invoices — list all invoices
  router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const invoices: Invoice[] = await prisma.invoice.findMany({
        include: {
          items: { include: { service: true, horse: true } },
          scanEvents: true,
          client: true
        }
      });
      res.json(invoices);
    } catch (err) {
      next(err);
    }
  });

  // POST /invoices — create invoice with items
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { clientId, date, items } = req.body;
    try {
      const invoice = await prisma.invoice.create({
        data: {
          clientId,
          date: date ? new Date(date) : undefined,
          items: {
            create: items.map((i: any) => ({
              serviceId: i.serviceId,
              horseId: i.horseId,
              quantity: i.quantity,
              unitPrice: i.unitPrice
            }))
          }
        },
        include: { items: true }
      });
      res.status(201).json(invoice);
    } catch (err) {
      next(err);
    }
  });

  // GET /invoices/:id — fetch one invoice
  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: {
          items: { include: { service: true, horse: true } },
          scanEvents: true,
          client: true
        }
      });
      if (!invoice) {
        res.status(404).json({ error: 'Invoice not found' });
        return;
      }
      res.json(invoice);
    } catch (err) {
      next(err);
    }
  });

  // PUT /invoices/:id — update invoice date or items
  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const { date, items } = req.body;
    try {
      // Optionally update items by deleting and recreating for simplicity
      await prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
      const updated = await prisma.invoice.update({
        where: { id },
        data: {
          date: date ? new Date(date) : undefined,
          items: {
            create: items.map((i: any) => ({
              serviceId: i.serviceId,
              horseId: i.horseId,
              quantity: i.quantity,
              unitPrice: i.unitPrice
            }))
          }
        },
        include: { items: true }
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /invoices/:id — delete an invoice
  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      await prisma.invoice.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
