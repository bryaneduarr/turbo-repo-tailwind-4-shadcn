import { serve } from "@hono/node-server";

import app from "@/app";
import env from "@/env";
import logger from "@/middleware/defaults/pino-logger";
import { connectToDatabase } from "@/db/config/connect-to-database";

async function startServer() {
  try {
    // Connect to the database.
    await connectToDatabase();

    // Start the server.
    logger.info(`[server]: Server on port ${env.PORT}. ${env.SERVER_URL}`);
    serve({ fetch: app.fetch, port: Number(env.PORT) });
  } catch (error) {
    logger.error(`[server]: Failed to start server: ${error}`);
    process.exit(1);
  }
}

// Start the server with Redis and database connections.
startServer();
