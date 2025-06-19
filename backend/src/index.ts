// File: backend/src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import clientRouter from "./routes/client";
import horseRouter from "./routes/horse";
import invoiceRouter from "./routes/invoice";
import scanRouter  from "./routes/scan";
import timecardRouter from "./routes/timecard";
import path from "path";

dotenv.config();

export const app = express();
export const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the HotFit Farrier API!");
});

// Health-check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/clients", clientRouter(prisma));
app.use("/horses", horseRouter(prisma));
app.use("/invoices", invoiceRouter(prisma));
app.use("/scans", scanRouter(prisma));
app.use("/timecards", timecardRouter(prisma));

// Static frontend
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

// SPA fallback
app.get(/.*/, (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Start server if not in test
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
  });
}
