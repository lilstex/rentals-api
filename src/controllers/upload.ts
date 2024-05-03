import { Request, Response } from "express";
import { upload } from "../services";
import { response } from "../helpers";

class UploadController {
  async uploadImage(req: Request, res: Response): Promise<void> {
    const data = await upload.uploadImage(req);
    return response(res, data);
  }
}

export = new UploadController();