import * as path from 'path';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Travel Buddy API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Travel Buddy application',
  },
  servers: [
    {
      url: 'https://fork-travel-buddy.vercel.app/api', // Add your production URL
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format "Bearer <token>"'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.ts'],
    // Multiple paths to ensure Swagger works in different environments
    // './pages/api/**/*.ts',
    // './pages/swagger.yaml',
    // process.cwd(),
  // ]
  // .filter(Boolean), // Remove any null values
  // failOnErrors: false,
  // verbose: true
};
