import Joi from 'joi';

class AuthValidation {
  accountRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  verifyAccountSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.number().required(),
  });

  validateUserTokenSchema = Joi.object({
    token: Joi.string().required(),
  });

  reSendEmailCodeSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  resendResetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  updatePasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.string().required(),
  });

  changePasswordSchema = Joi.object({
    password: Joi.string().required(),
  });

  deleteAccountSchema = Joi.object({
    password: Joi.string().required(),
  });

  setupOAuthSchema = Joi.object({
    oauthId: Joi.string().required(),
    email: Joi.string().email().required(),
    oauthType: Joi.string().valid('google', 'apple').required(),
  });

  updateProfileSchema = Joi.object({
    fullName: Joi.string(),
    phoneNumber: Joi.string(),
    location: Joi.string(),
    profileImage: Joi.string(),
  });

  getUserProfileSchema = Joi.object({
    userId: Joi.string().required(),
  });

  uploadImageSchema = Joi.object(); // Define schema as needed
}

export = AuthValidation;
