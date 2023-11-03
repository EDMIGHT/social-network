import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import prisma from '@/db/prisma';
import swaggerSpec from '@/docs/swagger';
import routes from '@/routes/index';

env.config();

const PORT = process.env.PORT || 3001;
const CLIENT_HOST = process.env.CLIENT_HOST;
const MAX_REQUEST_PER_WINDOW = process.env.MAX_REQUEST_PER_WINDOW;
const NODE_ENV = process.env.NODE_ENV;
const VERSION = process.env.npm_package_version;
const DESCRIPTION = process.env.npm_package_description;

const app = express();
app.set('trust proxy', 1 /* number of proxies between user and server */);

app.use(express.json({ limit: '5mb' }));
app.use(
  cors({
    origin: CLIENT_HOST,
  })
);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: Number(MAX_REQUEST_PER_WINDOW), // per 1 minutes
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);
app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_, res) => {
  res.send({
    mode: NODE_ENV,
    version: VERSION,
    description: DESCRIPTION,
  });
});

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

export default app;
