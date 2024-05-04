import Joi from 'joi';

class AuthValidation {
  registerAccountSchema() {
    return {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
  }

  userLoginSchema() {
    return {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
  }

  verifyAccountSchema() {
    return {
      email: Joi.string().email().required(),
      code: Joi.number().required(),
    };
  }

  validateUserTokenSchema() {
    return {
      token: Joi.string().required(),
    };
  }

  reSendEmailCodeSchema() {
    return {
      email: Joi.string().email().required(),
    };
  }

  forgotPasswordSchema() {
    return {
      email: Joi.string().email().required(),
    };
  }

  resendResetPasswordSchema() {
    return {
      email: Joi.string().email().required(),
    };
  }

  updatePasswordSchema() {
    return {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      token: Joi.string().required(),
    };
  }

  changePasswordSchema() {
    return {
      password: Joi.string().required(),
    };
  }

  deleteAccountSchema() {
    return {
      password: Joi.string().required(),
    };
  }

  setupOAuthSchema() {
    return {
      oauthId: Joi.string().required(),
      email: Joi.string().email().required(),
      oauthType: Joi.string().valid('google', 'apple').required(),
    };
  }

  updateProfileSchema() {
    return {
      fullName: Joi.string(),
      phoneNumber: Joi.string(),
      location: Joi.string(),
      profileImage: Joi.string(),
    };
  }

  getUserProfileSchema() {
    return {
      userId: Joi.string().required(),
    };
  }

  uploadImageSchema() {
    return {};
  }
}

export = new AuthValidation();