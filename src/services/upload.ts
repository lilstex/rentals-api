import { constants } from "../configs";
import fs from "fs";
import { cloudinary } from "../utils";

/**
 * Upload single image to cloudinary
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 */
const uploadImage = async (params: any): Promise<{ status: boolean, message: string, data?: any }> => {
    try {
        const { authId, file } = params;
        if (!file) {
            return {
                status: false,
                message: 'File not found'
            }
        }
        // Upload a new image
        const uploadOptions = {
            folder: "NESTFINDER",
        };
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, uploadOptions);
        fs.unlinkSync(file.path);
    
        const data = {
            account: authId,
            publicId: cloudinaryResponse.public_id,
            fileUrl: cloudinaryResponse.secure_url,
        }
        return {
            status: true,
            message: 'Image uploaded successfully',
            data
        };
    } catch (error) {
        console.log(error);
        return {
        status: false,
        message: constants.SERVER_ERROR('UPLOAD IMAGE TO CLOUDINARY'),
        };
    }
};


export = {
   uploadImage,
};