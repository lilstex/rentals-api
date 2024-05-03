import { Router, Response } from "express";
import { ResponseHandler } from "../helpers";
import authRoutes from "./auth";


const routes = Router();

routes.use("", authRoutes);

routes.use((_, res: Response) => {
  ResponseHandler.sendResponse(res, { status: false, message: "Route not found" }, 404);
});

export = routes;
