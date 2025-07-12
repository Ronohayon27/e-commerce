import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

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

app.get("/", (_req, res) => {
  logger.info("Root route hit");
  res.send("E-commerce backend running");
});

export default app;
