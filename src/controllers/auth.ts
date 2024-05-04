import { Request, Response } from "express";
import { Auth } from "../services";
import { CustomResponse } from "../helpers";
import { AuthenticatedRequest } from '../middlewares/validate';

const ResponseHandler = new CustomResponse();

const AuthService = new Auth();
class AuthController {
  async welcomeText(req: Request, res: Response): Promise<void> {
    const data = await AuthService.welcomeText();
    return ResponseHandler.sendResponse(res, data);
  }

  async registerAccount(req: Request, res: Response): Promise<void> {
    const data = await AuthService.registerAccount(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async userLogin(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.userLogin(req.form);
    return ResponseHandler.sendResponse(res, data);
  }

  async verifyAccount(req: Request, res: Response): Promise<void> {
    const data = await AuthService.verifyAccount(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async validateUserToken(req: Request, res: Response): Promise<void> {
    const data = await AuthService.validateUserToken(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async reSendEmailCode(req: Request, res: Response): Promise<void> {
    const data = await AuthService.reSendEmailCode(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async resendPasswordResetLink(req: Request, res: Response): Promise<void> {
    const data = await AuthService.resendPasswordResetLink(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const data = await AuthService.forgotPassword(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    const data = await AuthService.updatePassword(req.body);
    return ResponseHandler.sendResponse(res, data);
  }

  async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.changePassword(req.form);
    return ResponseHandler.sendResponse(res, data);
  }

  async deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.deleteAccount(req.form);
    return ResponseHandler.sendResponse(res, data);
  }

  async setupOAuth(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.setupOAuth(req.form);
    return ResponseHandler.sendResponse(res, data);
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.updateProfile(req.form);
    return ResponseHandler.sendResponse(res, data);
  }

  async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const data = await AuthService.getUserProfile(req.form);
    return ResponseHandler.sendResponse(res, data);
  }
}

export = AuthController;