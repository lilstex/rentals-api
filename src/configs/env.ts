import * as Joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

interface Env {
  NODE_ENV: string;
  PORT?: number;
  DB_URL: string;
  DB_PROD_URL: string;
  JWT_KEY: string;
  JWT_EXPIRES_IN: string;
  SECRET:string;
  RESETPASSWORDURL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const schema = Joi.object<Env>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging', 'test')
    .default('development'),
  PORT: Joi.number().required()
    .description('Application Port Numbert is required'),
  DB_URL: Joi.string()
    .required()
    .description('Development database url required'),
  DB_PROD_URL: Joi.string()
    .required()
    .description('Production database url required'),
  JWT_KEY: Joi.string()
    .required()
    .description('jwt key required'),
  JWT_EXPIRES_IN: Joi.string()
    .required()
    .description('jwt expiry time  required'),
  RESETPASSWORDURL: Joi.string()
    .required()
    .description('base url for reset password required'),
  CLOUDINARY_CLOUD_NAME: Joi.string()
    .required()
    .description('cloudinary name required'),
  CLOUDINARY_API_KEY: Joi.string()
    .required()
    .description('cloudinary api key required'),
  CLOUDINARY_API_SECRET: Joi.string()
    .required()
    .description('cloudinary api secret required'),
})
  .unknown()
  .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
  console.error(`Config validation error: ${error.message}`);
  process.exit(1);
}

const config: {
  env: string;
  port?: number;
  dbUrl: string;
  dbProdUrl: string;
  JWTKey: string;
  JWTExpireIn: string;
  secret: string;
  resetPasswordUrl: string;
  cloudName: string; 
  cloudApiKey: string; 
  cloudApiSecret: string;
} = {
  env: env.NODE_ENV,
  port: env.PORT,
  dbUrl: env.DB_URL,
  dbProdUrl: env.DB_PROD_URL,
  JWTKey: env.JWT_KEY,
  JWTExpireIn: env.JWT_EXPIRES_IN,
  secret: env.SECRET,
  resetPasswordUrl: env.RESETPASSWORDURL,
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  cloudApiKey: env.CLOUDINARY_API_KEY,
  cloudApiSecret: env.CLOUDINARY_API_SECRET,
};
export default config;
