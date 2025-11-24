import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scalable API with Auth & RBAC",
      version: "1.0.0",
      description: "REST API for users and tasks"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: []
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
