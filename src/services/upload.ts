import fs from 'fs';
import { Constants } from '../configs';
import { cloudinary } from '../utils';

class ImageService {
  async uploadImage(params: any): Promise<{ status: boolean, message: string, data?: any }> {
    try {
      const { authId, file } = params;
      if (!file) {
        return {
          status: false,
          message: 'File not found'
        };
      }

      // Upload a new image
      const uploadOptions = {
        folder: 'NESTFINDER',
      };
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path, uploadOptions);
      fs.unlinkSync(file.path);

      const data = {
        account: authId,
        publicId: cloudinaryResponse.public_id,
        fileUrl: cloudinaryResponse.secure_url,
      };

      return {
        status: true,
        message: 'Image uploaded successfully',
        data
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: Constants.SERVER_ERROR('UPLOAD IMAGE TO CLOUDINARY'),
      };
    }
  }
}

export = ImageService;