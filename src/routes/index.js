import express from "express";
import { productRoute } from "./ProductRoute.js";
import { authRoute } from "./AuthRoute.js";

const Router = express.Router();

Router.use("/products", productRoute);
Router.use("/auth", authRoute);

export const APIsRoute = Router;
