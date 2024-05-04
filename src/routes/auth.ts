import { Router } from "express";
import { AuthControl, Upload } from "../controllers";
import { ValidationMiddleware } from "../middlewares";
import { Validator } from "../validators";
import { singleUpload } from "../utils";

const routes = Router();

const Middleware = new ValidationMiddleware();
const AuthController = new AuthControl();
const UploadController = new Upload();
const AuthValidator = new Validator();

routes.get("/", AuthController.welcomeText);

routes.post(
  '/signup',
  Middleware.validateMiddleware(AuthValidator.registerAccountSchema()),
  AuthController.registerAccount
);

routes.post(
  '/login', 
  Middleware.validateMiddleware( AuthValidator.userLoginSchema()), 
  AuthController.userLogin
);

routes.post(
    '/verify-account',
    Middleware.validateMiddleware( AuthValidator.verifyAccountSchema()),
    AuthController.verifyAccount
);
  
routes.post(
    '/validate-user-token',
    Middleware.validateMiddleware( AuthValidator.validateUserTokenSchema()),
    AuthController.validateUserToken
);
  
routes.post(
    '/re-send-email-code',
    Middleware.validateMiddleware( AuthValidator.reSendEmailCodeSchema()),
    AuthController.reSendEmailCode
);
  
routes.post(
    '/forgot-password',
    Middleware.validateMiddleware( AuthValidator.forgotPasswordSchema()),
    AuthController.forgotPassword
);
  
routes.post(
    '/resend-password-reset-link',
    Middleware.validateMiddleware( AuthValidator.resendResetPasswordSchema()),
    AuthController.resendPasswordResetLink
);
  
routes.post(
    '/reset-password',
    Middleware.validateMiddleware( AuthValidator.updatePasswordSchema()),
    AuthController.updatePassword
);
  
routes.post(
    '/change-password',
    Middleware.validateMiddleware( AuthValidator.changePasswordSchema()),
    AuthController.changePassword
);
  
routes.delete(
    '/delete-account',
    Middleware.validateMiddleware( AuthValidator.deleteAccountSchema()),
    AuthController.deleteAccount
);

routes.post(
    '/setup-oauth',
    Middleware.validateMiddleware( AuthValidator.setupOAuthSchema()),
    AuthController.setupOAuth 
);

routes.put(
    '/update-profile', 
    Middleware.validateMiddleware( AuthValidator.updateProfileSchema()), 
    AuthController.updateProfile
);

routes.get(
    '/get-user-profile', 
    Middleware.validateMiddleware( AuthValidator.getUserProfileSchema()), 
    AuthController.getUserProfile
);

routes.post(
    '/cloudinary-upload-image', 
    singleUpload, 
    UploadController.uploadImage
);
  
export default routes;