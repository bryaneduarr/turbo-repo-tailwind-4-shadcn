import env from "@/env";
import notFound from "@/middleware/defaults/not-found";
import onError from "@/middleware/defaults/on-error";
import { honoLogger } from "@/middleware/defaults/pino-logger";
import { serveEmojiFavicon } from "@/middleware/defaults/serve-emoji-favicon";
import { cors } from "hono/cors";

import { createRouter } from "./create-router";

export function createApp() {
  const app = createRouter();

  app.use(
    "*",
    cors({
      origin: env.CLIENT_URL,
    }),
  );

  // Recommended to have this so this common configuration are already resolved. //

  // Define a not found route that will respond in JSON format.
  app.notFound(notFound);

  // Define a global error handler that will respond in JSON format.
  app.onError(onError);

  // Middleware that defines an emoji that will show as the favicon.
  app.use(serveEmojiFavicon("📦"));

  // Middleware that adds the logger to the context of the request.
  app.use(honoLogger);

  return app;
}
