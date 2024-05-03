import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { response } from '../helpers';
import { auth } from '../services';
import env from "../configs/env";
import { generalHelperFunctions } from "../helpers";

const { secret } = env

// list of non-restricted endpoints
const nonRestrictedEndPoints = [
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


export default async (req: Request, res: Response, next: NextFunction) => {
  if (nonRestrictedEndPoints.includes(req.path)) {
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
        // call it here 
        return response(res, { status: false, message: 'Unauthorized Access' }, 401);
      }

      (req as any).authData = data.data;
    }
    next();
  } 
};

