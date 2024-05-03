import { Response, Request } from "express";
import { upload } from "../services";
import { response } from "../helpers";
import { AuthenticatedRequest } from '../middlewares/validate';

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const data = await upload.uploadImage(req);
  return response(res, data);
};

export = {
  uploadImage,
};