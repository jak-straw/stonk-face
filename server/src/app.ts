import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import videoRoutes from "./routes/videoRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

/**
 * Create and configure Express application
 */
const createApp = (): Application => {
  const app: Application = express();

  // Security middleware
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  // Compression middleware
  app.use(compression());

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    app.use(requestLogger);
  } else {
    app.use(morgan("combined"));
  }

  // Health check endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // API info endpoint
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Stonk Face API",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        videos: "/api/videos",
        trending: "/api/videos/trending",
      },
      documentation: "/api/docs",
    });
  });

  // API Routes
  app.use("/api/videos", videoRoutes);

  // Handle 404 - Not Found
  app.use(notFound);

  // Global error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
