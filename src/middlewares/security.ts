import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../helpers';
import { Auth } from '../services';

const AuthService = new Auth();
const ResponseHandler = new CustomResponse();

export default class SecurityMiddleware {
  private nonRestrictedEndPoints: string[];

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
        const data: any = await AuthService.validateUserToken(body);
        if (!data.status) {
          return ResponseHandler.sendResponse(res, { status: false, message: 'Unauthorized Access' }, 401);
        }
        (req as any).authData = data.data;
      }
      next();
    }
  }
}

// export default new SecurityMiddleware();
