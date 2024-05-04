import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { CustomResponse } from '../helpers';

const ResponseHandler = new CustomResponse();

interface ValidationObject {
  [key: string]: Joi.Schema;
}

// Extend the Request type to include the 'auth' property
interface AuthenticatedRequest extends Request {
  form?: any;
}

class ValidationMiddleware {
  validateMiddleware(obj: ValidationObject) {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const schema = Joi.object(obj).required().unknown(false);
      const value = req.method === 'GET' ? req.query : req.body;
      const { error, value: vars } = schema.validate(value);

      if (error) {
        return ResponseHandler.sendResponse(res, { status: false, message: error.message });
      }

      const authData = {
        ...vars,
        ...(req as any).authData,
      };

      req.form = authData;
      next();
    };
  }
}

export {
  ValidationMiddleware,
  AuthenticatedRequest
}
