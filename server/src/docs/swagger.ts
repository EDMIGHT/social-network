import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social API',
      version: '1.0.0',
    },
  },
  basePath: 'api',
  host: 'localhost:3001',
  apis: ['./src/routes/*.ts'],
  servers: {
    url: 'http:://localhost:3001/api',
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
