import { Request, Response } from "express";
import { auth } from "../services";
import { response } from "../helpers";
import { AuthenticatedRequest } from '../middlewares/validate';

const welcomeText = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.welcomeText();
  return response(res, data);
};
const accountRegistration = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.accountRegistration(req.body);
  return response(res, data);
};

const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.login(req.form);
  return response(res, data);
};

const verifyAccount = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.verifyAccount(req.body);
  return response(res, data);
};

const validateUserToken = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.validateUserToken(req.body);
  return response(res, data);
};


const reSendEmailCode = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.reSendEmailCode(req.body);
  return response(res, data);
};

const resendPasswordResetLink = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.resendPasswordResetLink(req.body);
  return response(res, data);
};
const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.forgotPassword(req.body);
  return response(res, data);
};

const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const data = await auth.updatePassword(req.body);
  return response(res, data);
};

const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.changePassword(req.form);
  return response(res, data);
};

const deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.deleteAccount(req.form);
  return response(res, data);
};

const setupOAuth = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.setupOAuth(req.form);
  return response(res, data);
};

const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.updateProfile(req.form);
  return response(res, data);
};

const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = await auth.getUserProfile(req.form);
  return response(res, data);
};

export = {
  welcomeText,
  login, 
  accountRegistration,
  verifyAccount,
  validateUserToken,
  reSendEmailCode,
  forgotPassword,
  resendPasswordResetLink,
  updatePassword,
  changePassword,
  deleteAccount,
  setupOAuth,
  updateProfile,
  getUserProfile,
};
