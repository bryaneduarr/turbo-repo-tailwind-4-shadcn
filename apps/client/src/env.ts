import { z } from "zod";

const EnvSchema = z
  .object({
    NEXT_PUBLIC_SERVER_URL: z
      .url()
      .describe("The base URL used by the client to reach the server."),
  })
  .describe("Client environment variables schema.");

const env = EnvSchema.parse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export type Env = z.infer<typeof EnvSchema>;
export default env;
