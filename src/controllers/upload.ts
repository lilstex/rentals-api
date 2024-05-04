import { Request, Response } from "express";
import { UploadService } from "../services";
import { ResponseHandler } from "../helpers";

class UploadController {
  async uploadImage(req: Request, res: Response): Promise<void> {
    const data = await UploadService.uploadImage(req);
    return ResponseHandler.sendResponse(res, data);
  }
}

export = new UploadController();