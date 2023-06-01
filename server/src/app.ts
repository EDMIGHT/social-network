import express from 'express';
import env from 'dotenv';
import cors from 'cors';

import prisma from '@/db/prisma';
import routes from '@/routes/index';

env.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

const main = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`[server] server has been start on port ${PORT}`);
  });
};

main()
  .catch((error) => {
    if (error instanceof Error) console.error(`[server] error: ${error.message}`);
    else console.error(`[server] error connection: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
