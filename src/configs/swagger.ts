import swaggerJsDoc from "swagger-jsdoc";
import env from "./env";

class SwaggerConfig {
  private swaggerOptions: any;

  constructor() {
    this.swaggerOptions = {
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
  }

  generateSpec(): any {
    return swaggerJsDoc(this.swaggerOptions);
  }
}

const swaggerConfig = new SwaggerConfig();
export = swaggerConfig.generateSpec();
