import crypto from 'crypto';
import { Constants } from "../configs";

const ErrorMessage = new Constants();

class Helpers {
  testCode: number = 123456;
  testToken: string = '123456';

  handleError(error: any, context: string) {
    console.error(`Error in ${context}:`, error);
    return {
      status: false,
      message: ErrorMessage.SERVER_ERROR(context),
    };
  };
  

  isAlphanumeric(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  hasUpperCase(str: string): boolean {
    return /[A-Z]/.test(str);
  }

  hasLowerCase(str: string): boolean {
    return /[a-z]/.test(str);
  }

  hasDigit(str: string): boolean {
    return /[0-9]/.test(str);
  }

  isStrongPassword(password: string): boolean {
    return (
      password.length >= 8 &&
      this.hasUpperCase(password) &&
      this.hasLowerCase(password) &&
      this.hasDigit(password)
    );
  }

  serializeUserData(user: any): any {
    return {
      authId: user._id,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
      fullname: user.fullname,
      location: user.location,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      isGoogleSignIn: user.isGoogleSignIn,
      isAppleSignIn: user.isAppleSignIn,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  between(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  generateOtpCode(): number {
    const otpCode = this.between(100000, 200000);
    if (process.env.NODE_ENV === 'development') {
      return this.testCode;
    }
    return otpCode;
  }

  generatePasswordToken(): string {
    if (process.env.NODE_ENV === 'test') {
      return this.testToken;
    }
    return crypto.randomBytes(32).toString('hex');
  }

  convertToUTC(datetimeString: string): string {
    const date: Date = new Date(datetimeString);

    // Extract components
    const hours: number = date.getUTCHours();
    const minutes: number = date.getUTCMinutes();
    const seconds: number = date.getUTCSeconds();
    const day: number = date.getUTCDate();
    const month: number = date.getUTCMonth() + 1; // Months are 0-indexed, so add 1
    const year: number = date.getUTCFullYear();

    // Padding function to ensure two digits
    const pad: (num: number) => string = num => num.toString().padStart(2, '0');

    // Format components
    const timeString: string = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} (UTC), `;
    const dateString: string = `${pad(day)}-${pad(month)}-${year}`;

    // Return formatted datetime string
    return timeString + dateString;
  }

  generatePassword(): string {
    return crypto.randomBytes(6).toString('hex');
  }
}

export = Helpers;
