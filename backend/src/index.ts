// src/index.ts
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import clientRouter from "./routes/client";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the HotFit Farrier API!");
});

// Example health-check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount your client routes
app.use("/clients", clientRouter(prisma));

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
