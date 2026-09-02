import { config } from "dotenv";
import { z } from "zod";

config();

/**
 * -- Zod schema for server environment variables. --
 *
 * Throws an error if any required variable is missing or invalid.
 */
const EnvSchema = z
  .object({
    // Add all of the ENV variables to check and have type safety.
    SERVER_URL: z.url().describe("The base URL for the server."),
    CLIENT_URL: z
      .url()
      .default("http://localhost:3000")
      .describe("The allowed client origin for CORS."),
    PORT: z.coerce.number().describe("The port the server runs on."),
    NODE_ENV: z
      .enum(["development", "production"])
      .describe("The environment mode."),
    LOG_LEVEL: z
      .enum(["info", "warn", "error", "debug", "fatal", "trace", "silent"])
      .describe("The log level used in pino-logger."),
    // Database connection settings.
    DB_HOST: z.string().describe("Where the database is hosted."),
    DB_PORT: z.coerce.number().describe("Default PostgreSQL port."),
    DB_USER: z.string().describe("Database user."),
    DB_PASSWORD: z.string().describe("Database password."),
    DB_NAME: z.string().describe("Database name."),
  })
  .describe("Server environment variables schema.");

// Parse and validate environment variables. Here we check if we really have the variables in '.env'.
const env = EnvSchema.parse(process.env);

export type Env = z.infer<typeof EnvSchema>;
export default env;
