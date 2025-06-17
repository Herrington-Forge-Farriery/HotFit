// src/routes/client.ts
import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

export default function (prisma: PrismaClient) {
  const router = Router();

  // GET /clients — list all clients
  router.get("/", async (_req: Request, res: Response) => {
    const clients = await prisma.client.findMany({
      include: { horses: true, invoices: true },
    });
    res.json(clients);
  });

  // POST /clients — create a new client
  router.post("/", async (req: Request, res: Response) => {
    const { firstName, lastName, street, city, state, zip, phone, email } = req.body;
    const client = await prisma.client.create({
      data: { firstName, lastName, street, city, state, zip, phone, email },
    });
    res.status(201).json(client);
  });

  return router;
}
