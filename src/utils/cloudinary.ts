import cloudinaryLib from 'cloudinary';
import env from "../configs/env";

const cloudinary = cloudinaryLib.v2;

const { cloudName, cloudApiKey, cloudApiSecret } = env;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export = cloudinary;