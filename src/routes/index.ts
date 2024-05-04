import { Router, Response } from "express";
import { CustomResponse } from "../helpers";
import authRoutes from "./auth";

const ResponseHandler = new CustomResponse();

const routes = Router();

routes.use("", authRoutes);

routes.use((_, res: Response) => {
  ResponseHandler.sendResponse(res, { status: false, message: "Route not found" }, 404);
});

export = routes;
