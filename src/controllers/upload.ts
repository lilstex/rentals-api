import { Request, Response } from "express";
import { UploadService } from "../services";
import { CustomResponse } from "../helpers";

const ResponseHandler = new CustomResponse();
const ImageService = new UploadService();

class UploadController {
  async uploadImage(req: Request, res: Response): Promise<void> {
    const data = await ImageService.uploadImage(req);
    return ResponseHandler.sendResponse(res, data);
  }
}

export = UploadController;