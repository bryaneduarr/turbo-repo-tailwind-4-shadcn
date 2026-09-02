import { Scalar } from "@scalar/hono-api-reference";
import { API_VX_PREFIX } from "@/config/api-prefix";
import type { AppOpenAPI } from "@/types/openapi";

import packageJson from "../../package.json";

/**
 * Configures OpenAPI documentation and reference UI for the application.
 *
 * Sets up the versioned OpenAPI specification endpoint with version information
 * from package.json and creates a Scalar-powered API reference UI alongside it.
 *
 * @param app - The OpenAPI-enabled application instance to configure
 */
export default function OpenApiConfig(app: AppOpenAPI) {
  app.doc(`${API_VX_PREFIX}/doc`, {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Back-End API",
    },
  });

  app.get(
    `${API_VX_PREFIX}/reference`,
    Scalar({
      url: `${API_VX_PREFIX}/doc`,
      theme: "kepler", // Change Scalar theme here.
      defaultHttpClient: {
        targetKey: "js", // Change this to a specific language.
        clientKey: "fetch", // Change this to the method you will be using for the language.
      },
    }),
  );
}
