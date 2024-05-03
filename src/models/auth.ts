import mongoose, { Schema, Document } from 'mongoose';

interface IAuth extends Document {
    email: string;
    password?: string;
    accountVerificationCode?: number;
    isAccountVerified?: boolean;
    location?: string;
    fullName?: string;
    phoneNumber?: string;
    profileImage?: string;
    googleId?: string;
    isGoogleSignIn?: boolean;
    appleId?: string;
    isAppleSignIn?: boolean;
    isDeleted?: boolean;
    passwordToken?: string;
    passwordResetCodeExpiresAt?: string;
    createdAt: Date;
}

const authSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    accountVerificationCode: {
      type: Number,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    googleId: {
      type: String,
    },
    isGoogleSignIn: {
      type: Boolean,
    },
    appleId: {
      type: String,
    },
    isAppleSignIn: {
      type: Boolean,
    },
    passwordToken: {
      type: String,
    },
    passwordResetCodeExpiresAt: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

authSchema.index({ email: 'text' });

const Auth = mongoose.model<IAuth>('Auth', authSchema);

export = Auth;
