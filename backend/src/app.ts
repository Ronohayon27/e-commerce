import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger";
import productRoutes from "./routes/productRoutes";

dotenv.config({ quiet: true });

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

app.use("/api/v1/products", productRoutes);

export default app;
