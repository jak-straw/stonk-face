import dotenv from "dotenv";
import createApp from "./app";
import { connectDatabase } from "./utils/database";

// Load environment variables
dotenv.config();

// Configuration
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    console.log("🔌 Connecting to database...");
    await connectDatabase();

    // Create Express app
    const app = createApp();

    // Start listening
    const server = app.listen(PORT, () => {
      console.log("");
      console.log("🚀 Server started successfully!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 Server running on: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API endpoint: http://localhost:${PORT}/api/videos`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("");
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("✅ HTTP server closed");

        try {
          // Close database connection
          const mongoose = await import("mongoose");
          await mongoose.default.connection.close();
          console.log("✅ Database connection closed");

          console.log("👋 Graceful shutdown completed");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error during graceful shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
      console.error("Error:", error.name, error.message);
      console.error("Stack:", error.stack);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any) => {
      console.error("💥 UNHANDLED REJECTION! Shutting down...");
      console.error("Reason:", reason);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
