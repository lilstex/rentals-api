import { Router, Request, Response, NextFunction } from "express";
import { response } from "../helpers";
import authRoutes from "./auth";


const routes = Router();

routes.use("", authRoutes);

routes.use((_, res: Response) => {
  response(res, { status: false, message: "Route not found" }, 404);
});

export = routes;
