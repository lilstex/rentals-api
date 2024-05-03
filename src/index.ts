import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './routes';
import { env, Swagger } from './configs';
import { Security } from './middlewares';
import { ResponseHandler } from './helpers';

class App {
  private app: Express;
  private server: http.Server;
  private port: number;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = env.port;

    dotenv.config();

    this.setupExpress();
    this.setupRoutes();
    this.setupErrorHandler();

    if (require.main === module) {
      this.server.listen(this.port, () => {
        console.log(`NestFinder API is running on http://localhost:${this.port}/api-docs`);
      });
    }
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(cors({ allowedHeaders: ['Content-Type', 'authorization', 'X-access-token'] }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(Swagger));
    this.app.use(Security.authenticate);
  }

  private setupRoutes(): void {
    this.app.use('', routes);
  }

  private setupErrorHandler(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      return ResponseHandler.sendResponse(res, { status: false, message: 'Internal server error' }, 500);
    });
  }

  public getApp(): Express {
    return this.app;
  }
}

const appInstance = new App();
export = appInstance.getApp();