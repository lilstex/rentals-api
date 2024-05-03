import { Router } from "express";
import { AuthController, Upload } from "../controllers";
import { ValidationMiddleware } from "../middlewares";
import validator from "../validators/auth";
import { singleUpload } from "../utils";

const routes = Router();

routes.get("/", AuthController.welcomeText);

routes.post(
  '/signup',
  ValidationMiddleware.validateMiddleware(validator.accountRegistration),
  AuthController.accountRegistration
);

routes.post(
  '/login', 
  ValidationMiddleware.validateMiddleware(validator.login), 
  AuthController.login
);

routes.post(
    '/verify-account',
    ValidationMiddleware.validateMiddleware(validator.verifyAccount),
    AuthController.verifyAccount
);
  
routes.post(
    '/validate-user-token',
    ValidationMiddleware.validateMiddleware(validator.validateUserToken),
    AuthController.validateUserToken
);
  
routes.post(
    '/re-send-email-code',
    ValidationMiddleware.validateMiddleware(validator.reSendEmailCode),
    AuthController.reSendEmailCode
);
  
routes.post(
    '/forgot-password',
    ValidationMiddleware.validateMiddleware(validator.forgotPassword),
    AuthController.forgotPassword
);
  
routes.post(
    '/resend-password-reset-link',
    ValidationMiddleware.validateMiddleware(validator.resendResetPassword),
    AuthController.resendPasswordResetLink
);
  
routes.post(
    '/reset-password',
    ValidationMiddleware.validateMiddleware(validator.updatePassword),
    AuthController.updatePassword
);
  
routes.post(
    '/change-password',
    ValidationMiddleware.validateMiddleware(validator.changePassword),
    AuthController.changePassword
);
  
routes.delete(
    '/delete-account',
    ValidationMiddleware.validateMiddleware(validator.deleteAccount),
    AuthController.deleteAccount
);

routes.post(
    '/setup-oauth',
    ValidationMiddleware.validateMiddleware(validator.setupOAuth ),
    AuthController.setupOAuth 
);

routes.put(
    '/update-profile', 
    ValidationMiddleware.validateMiddleware(validator.updateProfile), 
    AuthController.updateProfile
);

routes.get(
    '/get-user-profile', 
    ValidationMiddleware.validateMiddleware(validator.getUserProfile), 
    AuthController.getUserProfile
);

routes.post(
    '/cloudinary-upload-image', 
    singleUpload, 
    Upload.uploadImage
);
  
export default routes;