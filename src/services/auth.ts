import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Auth } from '../models';
import { Helper } from '../helpers';
import env from '../configs/env';

class AuthService {
  private JWTKey: string;
  private JWTExpireIn: string;
  private resetPasswordUrl: string;

  constructor() {
    this.JWTKey = env.JWTKey;
    this.JWTExpireIn = env.JWTExpireIn;
    this.resetPasswordUrl = env.resetPasswordUrl;
  }

  async welcomeText(): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      return {
        status: true,
        message: 'welcome to NestFinder API Service provider',
      };
    } catch (error) {
      return Helper.handleError(error, 'welcome');
    }
  }

  /**
   * Register account
   * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
   */
  async registerAccount(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email, password } = params;
      // Check if email already exists
      const existingUser = await Auth.findOne({ email });
      if (existingUser) {
        return {
          status: false,
          message: 'Email already in use',
        };
      }

      //generate email code
      const emailVerificationCode = Helper.generateOtpCode();

      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const user = await Auth.create({
        email: email,
        password: hashedPassword,
        accountVerificationCode: emailVerificationCode
      });

      // SEND EMAIL HERE
      const message: any = {
        email: email,
        type: 'accountVerification',
        subject: 'Account Verification',
        code: emailVerificationCode
      }

      // MAKE THE CALL TO EMAIL SERVICE PROVIDER

      // Serialize user data
      const userData = Helper.serializeUserData(user);

      return {
        status: true,
        message: 'Account Created Successfully',
        data: userData
      };
    } catch (error) {
      return Helper.handleError(error, 'registerAccount');
    }
  }

  /**
   * User Login
   * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
   */
  async userLogin(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email, password } = params;
      const user = await Auth.findOne({email});
      if (!user) {
        return {
          status: false,
          message: 'Incorrect credentials',
        };
      }

      if (user.isDeleted) {
        return {
          status: false,
          message: 'Account has been Deactivated or Deleted',
        };
      }

      // Check if password matches
      const passwordMatch = await bcrypt.compare(password, user.password!);
      if (!passwordMatch) {
        return {
          status: false,
          message: 'Incorrect credentials',
        };
      }

      // Check if user account is verified
      if (!user.isAccountVerified) {
        return {
          status: true,
          message: 'Please verify your account',
          data: Helper.serializeUserData(user)
        };
      }

      // Generate token
      const token = jwt.sign({ authId: user._id, email: user.email }, this.JWTKey, {
        expiresIn: this.JWTExpireIn,
      });

      // Serialize user data
      const userData = Helper.serializeUserData(user);

      return {
        status: true,
        message: 'Login successful',
        data: { token, ...userData },
      };
    } catch (error) {
      return Helper.handleError(error, 'userLogin');
    }
  }


  /**
   * Verify account
   * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
   */
  async verifyAccount(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email, code } = params;

      // Check if user email code is valid
      const accountToVerify = await Auth.findOne({
      email: email,
      accountVerificationCode: code
      });

      if (!accountToVerify) {
        return {
          status: false,
          message: 'Invalid code',
        };
      }
    
      const { isAccountVerified } = accountToVerify;
  
      // Check if email has already been confirmed
      if (isAccountVerified === true) {
        return {
          status: false,
          message: 'Account is already verified',
        };
      }
    
      // Set iAccountVerified to true and save
      accountToVerify.isAccountVerified = true;
      await accountToVerify.save();
    
      // Generate token
      const token = jwt.sign({ authId: accountToVerify._id, email: accountToVerify.email }, this.JWTKey, {
        expiresIn: this.JWTExpireIn,
      });
    
      // Serialize user data
      const userData = Helper.serializeUserData(accountToVerify);
  
      // Send welcome email
      const message: any = {
        email: email,
        type: 'welcome',
      }

      // MAKE THE CALL TO EMAIL SERVICE PROVIDER
  
      return {
        status: true,
        message: 'Account verified successfully!',
        data: { token, ...userData },
      };
    } catch (error) {
      return Helper.handleError(error, 'verifyAccount');
    }
  };

  /**
 * Validate user token
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async validateUserToken(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { token } = params;
      let loggedInUser: any;
      // Verify JWT token
      const check: any = await new Promise((resolve, reject) => {
        jwt.verify(token, this.JWTKey!, (err: any, user: any) => {
          if (err) {
            reject({ status: false });
          } else {
            loggedInUser = user;
            resolve({ status: true });
          }
        });
      });
      if (!check.status) {
        return {
          status: false,
          message: 'Invalid Token',
        };
      }
      return {
        status: true,
        message: 'User token verified successfully',
        data: loggedInUser
      };
    } catch (error) {
      return Helper.handleError(error, 'validateUserToken');
    };
  };

  /**
 * Send email code
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async reSendEmailCode(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email } = params;
      // Check if user email code is valid
      const isEmailExist = await Auth.findOne({ email });

      if (!isEmailExist) {
      return {
        status: false,
        message: 'Email does not exist',
      };
      }

      const emailVerificationCode = Helper.generateOtpCode();
      isEmailExist.accountVerificationCode = emailVerificationCode;
      await isEmailExist.save();

      //TODO:CALL NOTIFICATION SERVICE TO SEND EMAIL HERE:
      const message: any = {
        email: email,
        type: 'accountVerification',
        subject: 'Account Verification',
        code: emailVerificationCode
      }

      // MAKE THE CALL TO EMAIL SERVICE PROVIDER

      return {
        status: true,
        message: 'Email verification code sent successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'resendEmailCode');
    }
  };

  /**
 * forgot password
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async forgotPassword(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email } = params;
  
      // Check if user email code is valid
      const isEmailExist = await Auth.findOne({ email });
  
      if (!isEmailExist) {
        return {
          status: false,
          message: 'Email does not exist',
        };
      }
      // Generate token to use in the reset link
      const resetToken = Helper.generatePasswordToken();
  
      // Set timer for password reset link expiration 
      const currentDateObj = new Date();
      // set timer for password
      const passwordResetLinkExpiresAt = moment(currentDateObj).add(1, "h").toString();
  
      // Save the token and expiration time in the DB
      isEmailExist.passwordToken = resetToken;
      isEmailExist.passwordResetCodeExpiresAt = passwordResetLinkExpiresAt;
      await isEmailExist.save();
  
      // Compose the reset link using the reset token and your application's domain
      const resetLink = `${this.resetPasswordUrl}?email=${email}&token=${resetToken}`;
  
      // IMPLEMENT THE EMAIL MECHANISM TO SEND TO USER
      const message: any = {
        email: email,
        type: 'resetPassword',
        subject: 'Reset Password',
        resetLink: resetLink
      }
  
      // MAKE THE CALL TO EMAIL SERVICE PROVIDER

      return {
        status: true,
        message: 'Password reset link sent successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'forgotPassword');
    }
  };

  /**
 *  resend password reset link
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async resendPasswordResetLink(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email } = params;
  
      // Check if user email code is valid
      const isEmailExist = await Auth.findOne({ email });
  
      if (!isEmailExist) {
        return {
          status: false,
          message: 'Email does not exist',
        };
      }
      // Generate token to use in the reset link
      const resetToken = Helper.generatePasswordToken();
  
      // Set timer for password reset link expiration 
      const currentDateObj = new Date();
      // set timer for password
      const passwordResetLinkExpiresAt = moment(currentDateObj).add(1, "h").toString();
  
      // Save the token and expiration time in the DB
      isEmailExist.passwordToken = resetToken;
      isEmailExist.passwordResetCodeExpiresAt = passwordResetLinkExpiresAt;
      await isEmailExist.save();
  
      // Compose the reset link using the reset token and your application's domain
      const resetLink = `${this.resetPasswordUrl}?email=${email}&token=${resetToken}`;
  
      // IMPLEMENT THE EMAIL MECHANISM TO SEND TO USER
      const message: any = {
        email: email,
        type: 'resetPassword',
        subject: 'Reset Password',
        resetLink: resetLink
      }

      // MAKE THE CALL TO EMAIL SERVICE PROVIDER

      return {
        status: true,
        message: 'Password reset link sent successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'resendPasswordResetLink');
    }
  };

/**
 * Change password
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async changePassword(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { password, authId } = params;
      const account = await Auth.findOne({ _id: authId });
  
      if (!account) {
        return {
          status: false,
          message: 'Account not found',
        };
      }

      if (!Helper.isStrongPassword(password)) {
        return {
          status: false,
          message: "Password is not strong. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and consist of alphanumeric characters only.",
         };
      }

      //Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12);
      account.password = hashedPassword;
  
      await account.save();

      // Send email on successful change of password
      const message: any = {
        email: account.email,
        type: 'passwordChanged',
        subject: 'Password changed',
      }

      // MAKE THE CALL TO EMAIL SERVICE

      return {
        status: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'changePassword');
    }
  };

/**
 * Update password
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async updatePassword(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { email, password, token } = params;
      // Check if the token exists and is valid
      const currentDateObj = new Date().toString();
      // Check if user email code is valid
      const account = await Auth.findOne({
        email: email,
        passwordToken: token
      });
  
      if (!account) {
        return {
          status: false,
          message: 'Invalid reset token',
        };
      }

      if (!Helper.isStrongPassword(password)) {
        return {
          status: false,
          message: "Password is not strong. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and consist of alphanumeric characters only.",
        };
      }
      const passwordExpiresAt = account.passwordResetCodeExpiresAt!;
  
      //check if reset link has expired
      if (currentDateObj > passwordExpiresAt) {
        return {
          status: false,
          message: 'Reset token has expired',
        };
      }
  
      //Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12);
      account.password = hashedPassword;
  
      await account.save();

      return {
        status: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'updatePassword');
    }
  };

/**
 * Delete account
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async deleteAccount(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { authId, password } = params;
  
      // Check if user account exist
      const accountExist = await Auth.findOne({ _id: authId });
  
      if (!accountExist) {
        return {
          status: false,
          message: 'Account does not exist',
        };
      }
  
      // Check if password matches
      const passwordMatch = await bcrypt.compare(password, accountExist.password!);
      if (!passwordMatch) {
        return {
          status: false,
          message: 'Incorrect credentials',
        };
      }
  
      // Update the account
      accountExist.isDeleted = true;
      await accountExist.save();

      return {
        status: true,
        message: 'Account deleted successfully',
      };
    } catch (error) {
      return Helper.handleError(error, 'deleteAccount');
    }
  };

 /**
 * setupOAuth
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
  async setupOAuth(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { oauthId, email, oauthType } = params;
      let user: any;
      let isSignIn = false;
      let oauthField;
      switch (oauthType) {
        case 'google':
          oauthField = 'googleId';
          isSignIn = true;
          break;
        case 'apple':
          oauthField = 'appleId';
          isSignIn = true;
          break;
        default:
          return {
            status: false,
            message: 'Selected oauthType not implemented',
          };
      }

      user = await Auth.findOne({ email });
  
      if (!user) {
        const newUser = await Auth.create({
          email: email,
          [oauthField]: oauthId,
          isAccountVerified: true,
          [isSignIn ? `is${oauthType.charAt(0).toUpperCase()}${oauthType.slice(1)}SignIn` : '']: true
        });

        user = newUser;
      }
      // Check if oauthID is equal
      if (oauthId !== user[oauthField]) {
        return {
          status: false,
          message: 'Wrong credentials'
        }
      }
  
      if (user.isDeleted) {
        return {
          status: false,
          message: 'Account has been Deactivated or Deleted',
        };
      }
  
      // Generate token
      const token = jwt.sign({ authId: user.id, email: user.email }, this.JWTKey, {
        expiresIn: this.JWTExpireIn,
      })
  
      // Serialize user data
      const userData = Helper.serializeUserData(user);
  
      return {
        status: true,
        message: 'Login successful',
        data: { token, ...userData },
      };
    } catch (error) {
      return Helper.handleError(error, 'setupOauth');
    }
  };


/**
 * Update user profile 
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
async updateProfile(params: any): Promise<{ status: boolean, message: string, data?: any }> {
  try {
    const { authId, fullName, profileImage, location, phoneNumber } = params;

    // Check if user account exist
    const account = await Auth.findOne({ _id: authId });

    if (!account) {
      return {
        status: false,
        message: `Acccount does not exist`,
      };
    }

    // Update the profile
    account.fullName = fullName ?? account.fullName;
    account.location = location ?? account.location;
    account.profileImage = profileImage ?? account.profileImage;
    account.phoneNumber = phoneNumber ?? account.phoneNumber;
    await account.save();
   
    return {
      status: true,
      message: 'Account profile updated successfully',
      data: Helper.serializeUserData(account)
    };
  } catch (error) {
    return Helper.handleError(error, 'updateProfile');
  }
};

/**
 * Get user profile 
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
 async getUserProfile(params: any): Promise<{ status: boolean, message: string, data?: any }> {
  try {
    const { userId } = params;

    // Check if user account exist
    const account = await Auth.findOne({ _id: userId });

    if (!account) {
      return {
        status: false,
        message: `Acccount does not exist`,
      };
    }
   
    return {
      status: true,
      message: 'User profile fetched successfully',
      data: Helper.serializeUserData(account)
    };
  } catch (error) {
    return Helper.handleError(error, 'getUserProfile');
  }
};

}

export =new AuthService();