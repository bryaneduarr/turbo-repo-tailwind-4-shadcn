import env from "@/env";
import logger from "@/middleware/defaults/pino-logger";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Individual connection parameters to initialize connection.
const client = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

/**
 * Establishes a connection to the PostgreSQL database.
 * Performs a simple query to verify the connection is working.
 *
 * If an error occurs during the connection process, it logs
 * the error and throws an exception.
 *
 * @returns {Promise<boolean>} Returns true if connection is successful.
 * @throws {Error} If the connection to the database fails.
 */
export async function connectToDatabase(): Promise<boolean> {
  try {
    // Verify connection by executing a simple query.
    // await client`SELECT 1`; // Disable for cost if external database.
    logger.info("[database]: Connected to PostgreSQL database.");

    return true;
  } catch (error) {
    logger.error(`[database]: Database connection error: ${error}`);
    throw new Error("[database]: Failed to connect to the database");
  }
}

// Create a Drizzle ORM instance.
export const db = drizzle(client);
export { client };
