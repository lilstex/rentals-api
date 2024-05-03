import crypto from 'crypto';

const testCode = 123456;
const testToken = '123456';


function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

function hasUpperCase(str: string): boolean {
  return /[A-Z]/.test(str);
}

function hasLowerCase(str: string): boolean {
  return /[a-z]/.test(str);
}

function hasDigit(str: string): boolean {
  return /[0-9]/.test(str);
}

function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    hasUpperCase(password) &&
    hasLowerCase(password) &&
    hasDigit(password)
  );
}

// Function to serialize user data
const serializeUserData = (user: any) => {
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
};

const between = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateOtpCode = () => {
  const otpCode = between(100000, 200000);
  if (process.env.NODE_ENV === 'development') {
    return testCode;
  }
  return otpCode;
};

const generatePasswordToken = () => {
  if (process.env.NODE_ENV === 'test') {
    return testToken;
  }
  return crypto.randomBytes(32).toString('hex');
};

const convertToUTC = (datetimeString: string): string => {
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
};

const generatePassword = () => {
  return crypto.randomBytes(6).toString('hex');
};


export default {
  serializeUserData,
  generateOtpCode,
  generatePasswordToken,
  convertToUTC,
  generatePassword,
  isStrongPassword,
};