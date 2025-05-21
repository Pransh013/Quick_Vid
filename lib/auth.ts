import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/drizzle/schema";
import { nextCookies } from "better-auth/next-js";
import { env as serverEnv } from "@/env/server";
import { env as clientEnv } from "@/env/client";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
  baseURL: clientEnv.NEXT_PUBLIC_BASE_URL,
});
