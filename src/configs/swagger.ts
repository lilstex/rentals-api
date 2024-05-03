import swaggerJsDoc from "swagger-jsdoc";
import  env  from "./env";


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "2.0.0",
      title: "NestFinder API Endpoints",
      contact: { name: "Emmanuel Mbagwu" },
      servers: [{ url: `http://localhost:${env.port}` }],
    },
  },
  apis: ["./src/swaggerDocs/**/*.yml"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export = swaggerSpec;
