import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "production", "test"])
    .default("production"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("https://app.risitify.com"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://risitify.com"),
});

// Type for the validated environment variables
type Env = z.infer<typeof envSchema>;

// Validate and export the environment variables
let env: Env;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error("Environment variable validation failed:", error);
  throw error;
}

export { env };

// Export type for use in other files
export type { Env };

// Helper function to check if we're in development
export const isDevelopment = () => env.NEXT_PUBLIC_APP_ENV === "development";

// Helper function to check if we're in production
export const isProduction = () => env.NEXT_PUBLIC_APP_ENV === "production";

// Helper function to get the current environment
export const getEnvironment = () => env.NEXT_PUBLIC_APP_ENV;
