import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config({ quiet: true });
const currentVersion = "/api/v1";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use Morgan to log HTTP requests
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()), // Pipe to Pino
    },
  })
);

app.use(`${currentVersion}/products`, productRoutes);
app.use(`${currentVersion}/auth`, authRoutes);

export default app;
