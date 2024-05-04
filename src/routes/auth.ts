import { Router } from "express";
import { AuthController, Upload } from "../controllers";
import { Middleware } from "../middlewares";
import { Validator } from "../validators";
import { singleUpload } from "../utils";

const routes = Router();

routes.get("/", AuthController.welcomeText);

routes.post(
  '/signup',
  Middleware.validateMiddleware(Validator.registerAccountSchema()),
  AuthController.registerAccount
);

routes.post(
  '/login', 
  Middleware.validateMiddleware( Validator.userLoginSchema()), 
  AuthController.userLogin
);

routes.post(
    '/verify-account',
    Middleware.validateMiddleware( Validator.verifyAccountSchema()),
    AuthController.verifyAccount
);
  
routes.post(
    '/validate-user-token',
    Middleware.validateMiddleware( Validator.validateUserTokenSchema()),
    AuthController.validateUserToken
);
  
routes.post(
    '/re-send-email-code',
    Middleware.validateMiddleware( Validator.reSendEmailCodeSchema()),
    AuthController.reSendEmailCode
);
  
routes.post(
    '/forgot-password',
    Middleware.validateMiddleware( Validator.forgotPasswordSchema()),
    AuthController.forgotPassword
);
  
routes.post(
    '/resend-password-reset-link',
    Middleware.validateMiddleware( Validator.resendResetPasswordSchema()),
    AuthController.resendPasswordResetLink
);
  
routes.post(
    '/reset-password',
    Middleware.validateMiddleware( Validator.updatePasswordSchema()),
    AuthController.updatePassword
);
  
routes.post(
    '/change-password',
    Middleware.validateMiddleware( Validator.changePasswordSchema()),
    AuthController.changePassword
);
  
routes.delete(
    '/delete-account',
    Middleware.validateMiddleware( Validator.deleteAccountSchema()),
    AuthController.deleteAccount
);

routes.post(
    '/setup-oauth',
    Middleware.validateMiddleware( Validator.setupOAuthSchema()),
    AuthController.setupOAuth 
);

routes.put(
    '/update-profile', 
    Middleware.validateMiddleware( Validator.updateProfileSchema()), 
    AuthController.updateProfile
);

routes.get(
    '/get-user-profile', 
    Middleware.validateMiddleware( Validator.getUserProfileSchema()), 
    AuthController.getUserProfile
);

routes.post(
    '/cloudinary-upload-image', 
    singleUpload, 
    Upload.uploadImage
);
  
export default routes;