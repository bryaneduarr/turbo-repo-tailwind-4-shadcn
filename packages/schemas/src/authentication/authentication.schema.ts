import { z } from "@hono/zod-openapi";

export const signInSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(1),
});

export type SignIn = z.infer<typeof signInSchema>;
