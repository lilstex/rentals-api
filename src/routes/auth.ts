import { Router } from "express";
import { auth, upload } from "../controllers";
import { validate } from "../middlewares";
import validator from "../validators/auth";
import { singleUpload } from "../utils";

const routes = Router();

routes.get("/", auth.welcomeText);

routes.post(
  '/signup',
  validate(validator.accountRegistration),
  auth.accountRegistration
);

routes.post(
  '/login', 
  validate(validator.login), 
  auth.login
);

routes.post(
    '/verify-account',
    validate(validator.verifyAccount),
    auth.verifyAccount
);
  
routes.post(
    '/validate-user-token',
    validate(validator.validateUserToken),
    auth.validateUserToken
);
  
routes.post(
    '/re-send-email-code',
    validate(validator.reSendEmailCode),
    auth.reSendEmailCode
);
  
routes.post(
    '/forgot-password',
    validate(validator.forgotPassword),
    auth.forgotPassword
);
  
routes.post(
    '/resend-password-reset-link',
    validate(validator.resendResetPassword),
    auth.resendPasswordResetLink
);
  
routes.post(
    '/reset-password',
    validate(validator.updatePassword),
    auth.updatePassword
);
  
routes.post(
    '/change-password',
    validate(validator.changePassword),
    auth.changePassword
);
  
routes.delete(
    '/delete-account',
    validate(validator.deleteAccount),
    auth.deleteAccount
);

routes.post(
    '/setup-oauth',
    validate(validator.setupOAuth ),
    auth.setupOAuth 
);

routes.put(
    '/update-profile', 
    validate(validator.updateProfile), 
    auth.updateProfile
);

routes.get(
    '/get-user-profile', 
    validate(validator.getUserProfile), 
    auth.getUserProfile
);

routes.post(
    '/cloudinary-upload-image', 
    singleUpload, 
    upload.uploadImage
);
  
  
export default routes;