import * as Joi from "joi";

const authValidation = {
  accountRegistration: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
  login: {
    email: Joi.string().email().required(),
    password:Joi.string().required(),
  },
  verifyAccount: {
    email: Joi.string().email().required(),
    code: Joi.number().required().required(),
  },
  validateUserToken: {
    token: Joi.string().required(),
  },
  reSendEmailCode: {
    email: Joi.string().email().required(),
  },
  forgotPassword: {
    email: Joi.string().email().required(),
  },
  resendResetPassword: {
    email: Joi.string().email().required(),
  },
  updatePassword: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.string().required(),
  },
  changePassword: {
    password: Joi.string().required(),
  },
  deleteAccount: {
    password: Joi.string().required(),
  },
  setupOAuth : {
    oauthId: Joi.string().required(),
    email: Joi.string().email().required(),
    oauthType: Joi.string().valid('google', 'apple').required(),
  },
  updateProfile: {
    fullName: Joi.string(),
    phoneNumber: Joi.string(),
    location: Joi.string(),
    profileImage: Joi.string(),
  },
  getUserProfile: {
    userId: Joi.string().required(),
  },
  uploadImage: {},
};

export default authValidation;