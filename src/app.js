import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { logger } from "./config/logger.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import { APIsRoute } from "./routes/index.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(
  morgan("combined", {
    stream: logger.stream,
    skip: (req, res) => {
      return (
        req.originalUrl.startsWith("/api-docs") ||
        (req.headers.referer && req.headers.referer.includes("/api-docs"))
      );
    },
  })
);

// Cấu hình Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", APIsRoute);

export default app;
