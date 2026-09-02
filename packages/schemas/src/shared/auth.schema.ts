import { z } from "@hono/zod-openapi";

// Sign-in schema
export const signInSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(1),
});

// Export types
export type SignIn = z.infer<typeof signInSchema>;
