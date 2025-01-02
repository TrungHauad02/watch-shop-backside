import express from "express";
import { productRoute } from "./ProductRoute.js";

const Router = express.Router();

Router.use("/products", productRoute);

export const APIsRoute = Router;
