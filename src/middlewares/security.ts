import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../helpers';
import { auth } from '../services';

class AuthMiddleware {
  nonRestrictedEndPoints: string[];

  constructor() {
    this.nonRestrictedEndPoints = [
      '/',
      '/login',
      '/account-registration',
      '/validate-user-token',
      '/verify-account',
      '/re-send-email-code',
      '/forgot-password',
      '/resend-password-reset-link',
      '/reset-password',
      '/setup-oauth',
    ];
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (this.nonRestrictedEndPoints.includes(req.path)) {
      next();
    } else {
      // Verify the token 
      let token: any;
      if (req.headers.authorization) {
        const [authType, authToken] = req.headers.authorization.split(' ');
        if (authType.toLowerCase() === 'bearer') {
          token = authToken;
        } else {
          token = req.headers.authorization;
        }
        const body = { token };
        const data: any = await auth.validateUserToken(body);
        if (!data.status) {
          return ResponseHandler.sendResponse(res, { status: false, message: 'Unauthorized Access' }, 401);
        }
        (req as any).authData = data.data;
      }
      next();
    }
  }
}

export = new AuthMiddleware();
