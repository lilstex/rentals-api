import { Request, Response } from "express";
import { auth } from "../services";
import { response } from "../helpers";
import { AuthenticatedRequest } from '../middlewares/validate';

class AuthController {
  async welcomeText(req: Request, res: Response): Promise<void> {
    const data = await auth.welcomeText();
    return response(res, data);
  }

  async accountRegistration(req: Request, res: Response): Promise<void> {
    const data = await auth.accountRegistration(req.body);
    return response(res, data);
  }

  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.login(req.form);
    return response(res, data);
  }

  async verifyAccount(req: Request, res: Response): Promise<void> {
    const data = await auth.verifyAccount(req.body);
    return response(res, data);
  }

  async validateUserToken(req: Request, res: Response): Promise<void> {
    const data = await auth.validateUserToken(req.body);
    return response(res, data);
  }

  async reSendEmailCode(req: Request, res: Response): Promise<void> {
    const data = await auth.reSendEmailCode(req.body);
    return response(res, data);
  }

  async resendPasswordResetLink(req: Request, res: Response): Promise<void> {
    const data = await auth.resendPasswordResetLink(req.body);
    return response(res, data);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const data = await auth.forgotPassword(req.body);
    return response(res, data);
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    const data = await auth.updatePassword(req.body);
    return response(res, data);
  }

  async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.changePassword(req.form);
    return response(res, data);
  }

  async deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.deleteAccount(req.form);
    return response(res, data);
  }

  async setupOAuth(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.setupOAuth(req.form);
    return response(res, data);
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.updateProfile(req.form);
    return response(res, data);
  }

  async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await auth.getUserProfile(req.form);
    return response(res, data);
  }
}

export = new AuthController();