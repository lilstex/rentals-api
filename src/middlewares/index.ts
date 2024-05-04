import { ValidationMiddleware } from './validate';
import Security from './security';

const Middleware = new ValidationMiddleware();

const modules = {
  Middleware,
  Security,
};

export = modules;