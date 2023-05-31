import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

env.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`[server] server has been start on port ${PORT}`);
  });
};

main()
  .catch((error) => {
    if (error instanceof Error) console.log(`[server] error: ${error.message}`);
    else console.log(`[server] error connection: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
